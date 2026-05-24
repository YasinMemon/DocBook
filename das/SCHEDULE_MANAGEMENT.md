# Doctor Schedule Management Feature

## Overview
A comprehensive frontend interface that allows doctors to manage their weekly availability schedule through the Doctor Dashboard. This feature enables doctors to enable/disable specific days and select time slots for each available day.

## Features Implemented

### 1. **Edit Mode Toggle**
- Click "Edit Schedule" button to enter edit mode
- Shows Cancel and Save Changes buttons when in edit mode
- Disabled for doctors with pending verification status

### 2. **Day Management**
- Toggle individual days on/off
- Each day can be independently enabled or disabled
- Visual feedback with green (enabled) and gray (disabled) states
- Status indicator dot for quick visual reference

### 3. **Time Slot Selection**
- Three time slot options per day:
  - **Morning:** 9:00 AM - 12:00 PM
  - **Afternoon:** 12:00 PM - 5:00 PM  
  - **Evening:** 5:00 PM - 9:00 PM
- Multiple time slots can be selected for each day
- Interactive buttons with visual feedback

### 4. **Quick Actions**
- **Enable All Days:** Quickly enable all days with all time slots
- **Disable All:** Quickly disable all days at once

### 5. **Validation**
- Inline warning if a day is enabled but no time slots are selected
- Alert message before save if validation fails
- Prevents saving invalid schedules

### 6. **Visual Feedback**
- Color-coded day cards (green for available, gray for unavailable)
- Selected time slots highlighted in indigo
- Loading spinner during save operation
- Edit mode banner with instructions

## Component Structure

### File Location
```
das/src/components/dashboard/AvailabilitySection.jsx
```

### State Management
- `isEditMode`: Controls edit/view mode
- `isSaving`: Tracks save operation status
- `editedSchedule`: Stores temporary schedule changes

### Data Structure
```javascript
editedSchedule = {
  "Monday": {
    enabled: true,
    slots: ["morning", "afternoon", "evening"]
  },
  "Tuesday": {
    enabled: false,
    slots: []
  },
  // ... other days
}
```

## User Flow

### Viewing Schedule
1. Doctor navigates to "Availability" tab in dashboard
2. Sees current weekly schedule with day-wise availability
3. Each day shows:
   - Availability status (enabled/disabled)
   - Time slots if available
   - Status indicator

### Editing Schedule

#### Step 1: Enter Edit Mode
- Click "Edit Schedule" button
- Edit mode banner appears
- Quick action buttons shown (Enable All Days / Disable All)

#### Step 2: Modify Schedule
- Click "Enabled" / "Enable Day" to toggle day availability
- When day is enabled, time slot buttons appear
- Click time slot buttons to select/deselect slots
- Multiple slots can be selected per day
- Inline validation warning if day enabled but no slots selected

#### Step 3: Save Changes
- Click "Save Changes" button
- Validation runs automatically
- If invalid: Alert shows which days need time slots
- If valid: Shows loading state, then success message
- Returns to view mode after successful save

#### Step 4: Cancel (Optional)
- Click "Cancel" button to exit edit mode without saving
- All changes are discarded
- Returns to view mode with original schedule

## API Integration (To Be Implemented)

### Save Schedule Endpoint
Currently, the frontend logs the data structure and shows a success message. To integrate with backend:

```javascript
// Replace this in handleSave function:
// await axios.put('/api/doctor/schedule', scheduleData);

// Expected API payload:
{
  available_days: ["Monday", "Tuesday", "Friday"],
  time_slots: ["Morning", "Afternoon", "Evening"]
}
```

### Response Expected
```javascript
{
  success: true,
  message: "Schedule updated successfully",
  doctor: {
    // Updated doctor object with new schedule
  }
}
```

## UI States

### 1. **Pending Verification**
- Edit buttons disabled
- Tooltip shows "Feature available after approval"
- Yellow warning banner displayed

### 2. **View Mode (Default)**
- "Edit Schedule" button visible
- Read-only schedule display
- Available/Unavailable badges shown

### 3. **Edit Mode**
- "Cancel" and "Save Changes" buttons visible
- Blue edit mode banner with instructions
- Quick action buttons displayed
- Interactive day toggles and time slot selectors
- Validation warnings if applicable

### 4. **Saving State**
- "Save Changes" button shows spinner
- Button disabled with "Saving..." text
- Prevents multiple submissions

## Styling Features

### Color Scheme
- **Primary Blue:** #4F46E5 (Indigo-600) for active states
- **Success Green:** #10B981 (Green-500) for available days
- **Gray:** #6B7280 for unavailable states
- **Warning Red:** #EF4444 for validation errors

### Responsive Design
- Mobile-friendly layout
- Time slot buttons wrap on smaller screens
- Consultation info cards stack on mobile

### Animations
- Smooth transitions on state changes
- Hover effects on interactive elements
- Color transitions (0.2s ease)

## Additional Information Display

### Consultation Details
Below the weekly schedule, shows:
- **Per Session Duration:** e.g., 30 min
- **Consultation Type:** Online / In-Clinic / Both
- **Consultation Fee:** e.g., ₹500

## Future Enhancements (Not Implemented)

Potential improvements for backend integration:
1. Real-time schedule updates via WebSocket
2. Conflict detection with existing appointments
3. Bulk import/export schedule data
4. Template schedules (e.g., "Weekdays Only")
5. Holiday/exception management
6. Schedule preview before saving
7. Appointment density visualization
8. Integration with calendar apps

## Testing Checklist

- [ ] Edit button disabled when doctor status is pending
- [ ] Edit mode toggles correctly
- [ ] Days can be enabled/disabled individually
- [ ] Time slots can be selected/deselected
- [ ] Multiple time slots per day work correctly
- [ ] Quick action "Enable All Days" works
- [ ] Quick action "Disable All" works
- [ ] Validation warning appears for enabled days without slots
- [ ] Save button validation prevents invalid saves
- [ ] Cancel button discards changes
- [ ] Save button shows loading state
- [ ] Success message appears after save (simulated)
- [ ] Schedule display updates correctly in view mode

## Browser Compatibility
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies
- React 18+
- Tailwind CSS 3+
- React Context API (AuthContext)

---

**Note:** This is a frontend-only implementation. Backend API integration needs to be completed for full functionality.
