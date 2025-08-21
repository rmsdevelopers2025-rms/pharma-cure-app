
import { useState, useEffect } from 'react';
import { Bell, Plus, Trash2, Clock, Pill, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface Reminder {
  id: string;
  drugName: string;
  dosage: string;
  frequency: string;
  time: string[];
  startDate: string;
  endDate: string;
  notes: string;
  alarmSound: string;
}

const DrugReminder = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    drugName: '',
    dosage: '',
    frequency: 'daily',
    time: ['08:00'],
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    notes: '',
    alarmSound: 'default'
  });
  const { t } = useLanguage();

  useEffect(() => {
    // Load reminders from localStorage
    const savedReminders = localStorage.getItem('drugReminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  const saveReminders = (updatedReminders: Reminder[]) => {
    setReminders(updatedReminders);
    localStorage.setItem('drugReminders', JSON.stringify(updatedReminders));
  };

  const addReminder = () => {
    if (!newReminder.drugName || !newReminder.dosage) return;

    const reminder: Reminder = {
      id: Date.now().toString(),
      drugName: newReminder.drugName!,
      dosage: newReminder.dosage!,
      frequency: newReminder.frequency || 'daily',
      time: newReminder.time || ['08:00'],
      startDate: newReminder.startDate || new Date().toISOString().split('T')[0],
      endDate: newReminder.endDate || '',
      notes: newReminder.notes || '',
      alarmSound: newReminder.alarmSound || 'default'
    };

    const updatedReminders = [...reminders, reminder];
    saveReminders(updatedReminders);
    
    setNewReminder({
      drugName: '',
      dosage: '',
      frequency: 'daily',
      time: ['08:00'],
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      notes: '',
      alarmSound: 'default'
    });
    setShowAddForm(false);

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const deleteReminder = (id: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    saveReminders(updatedReminders);
  };

  const addTime = () => {
    setNewReminder(prev => ({
      ...prev,
      time: [...(prev.time || []), '12:00']
    }));
  };

  const updateTime = (index: number, value: string) => {
    setNewReminder(prev => ({
      ...prev,
      time: prev.time?.map((time, i) => i === index ? value : time) || []
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">{t('reminders')}</h2>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('addReminder')}
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Reminder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Drug Name</label>
                <Input
                  value={newReminder.drugName || ''}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, drugName: e.target.value }))}
                  placeholder="Enter drug name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Dosage</label>
                <Input
                  value={newReminder.dosage || ''}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, dosage: e.target.value }))}
                  placeholder="e.g., 1 tablet, 5ml"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Frequency</label>
                <select
                  value={newReminder.frequency || 'daily'}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, frequency: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="daily">Daily</option>
                  <option value="twice-daily">Twice Daily</option>
                  <option value="thrice-daily">Thrice Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="as-needed">As Needed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <Input
                  type="date"
                  value={newReminder.startDate || ''}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">End Date (Optional)</label>
                <Input
                  type="date"
                  value={newReminder.endDate || ''}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, endDate: e.target.value }))}
                  min={newReminder.startDate}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Reminder Times</label>
              <div className="space-y-2">
                {newReminder.time?.map((time, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => updateTime(index, e.target.value)}
                    />
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addTime}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Time
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Alarm Sound</label>
                <select
                  value={newReminder.alarmSound || 'default'}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, alarmSound: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="default">Default Alarm</option>
                  <option value="bell">Bell</option>
                  <option value="chime">Chime</option>
                  <option value="beep">Beep</option>
                  <option value="tone">Tone</option>
                  <option value="vibrate">Vibrate Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                <Input
                  value={newReminder.notes || ''}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes..."
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={addReminder} className="bg-green-600">
                Save Reminder
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reminders.map((reminder) => (
          <Card key={reminder.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Pill className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">{reminder.drugName}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteReminder(reminder.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{reminder.dosage}</Badge>
                <Badge variant="outline">{reminder.frequency}</Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <div className="flex space-x-1">
                  {reminder.time.map((time, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-gray-500" />
                <Badge variant="secondary" className="text-xs">
                  {reminder.alarmSound === 'default' ? 'Default Alarm' : 
                   reminder.alarmSound === 'bell' ? 'Bell' :
                   reminder.alarmSound === 'chime' ? 'Chime' :
                   reminder.alarmSound === 'beep' ? 'Beep' :
                   reminder.alarmSound === 'tone' ? 'Tone' :
                   reminder.alarmSound === 'vibrate' ? 'Vibrate Only' :
                   'Default Alarm'}
                </Badge>
              </div>

              {reminder.notes && (
                <p className="text-sm text-gray-600">{reminder.notes}</p>
              )}

              <div className="text-xs text-gray-500">
                From: {reminder.startDate}
                {reminder.endDate && ` to ${reminder.endDate}`}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reminders.length === 0 && !showAddForm && (
        <Card className="text-center py-8">
          <CardContent>
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No reminders set yet. Add your first reminder to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DrugReminder;
