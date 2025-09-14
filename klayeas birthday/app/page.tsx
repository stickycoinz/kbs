'use client'

import { useState } from 'react'

interface TimeSlot {
  id: string
  day: string
  time: string
  timeEastern: string
  timeBST: string
  bookedBy: string
  isAvailable: boolean
}

interface Notes {
  specialRequests: string
  availability: string
}

const StreamSchedule = (): React.ReactElement => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    // Friday September 19th - 5 PM to 11 PM Eastern (10 PM Sept 19 - 4 AM Sept 20 BST)
    { id: 'fri-1', day: 'Friday 19th', time: '5:00 PM - 7:00 PM', timeEastern: '5:00 PM - 7:00 PM EST', timeBST: '10:00 PM - 12:00 AM BST', bookedBy: '', isAvailable: true },
    { id: 'fri-2', day: 'Friday 19th', time: '7:00 PM - 9:00 PM', timeEastern: '7:00 PM - 9:00 PM EST', timeBST: '12:00 AM - 2:00 AM BST', bookedBy: '', isAvailable: true },
    { id: 'fri-3', day: 'Friday 19th', time: '9:00 PM - 11:00 PM', timeEastern: '9:00 PM - 11:00 PM EST', timeBST: '2:00 AM - 4:00 AM BST', bookedBy: '', isAvailable: true },
    
    // Saturday September 20th - 10 AM to 10 PM Eastern (3 PM Sept 20 - 3 AM Sept 21 BST)
    { id: 'sat-1', day: 'Saturday 20th', time: '10:00 AM - 12:00 PM', timeEastern: '10:00 AM - 12:00 PM EST', timeBST: '3:00 PM - 5:00 PM BST', bookedBy: '', isAvailable: true },
    { id: 'sat-2', day: 'Saturday 20th', time: '12:00 PM - 2:00 PM', timeEastern: '12:00 PM - 2:00 PM EST', timeBST: '5:00 PM - 7:00 PM BST', bookedBy: '', isAvailable: true },
    { id: 'sat-3', day: 'Saturday 20th', time: '2:00 PM - 4:00 PM', timeEastern: '2:00 PM - 4:00 PM EST', timeBST: '7:00 PM - 9:00 PM BST', bookedBy: '', isAvailable: true },
    { id: 'sat-4', day: 'Saturday 20th', time: '4:00 PM - 6:00 PM', timeEastern: '4:00 PM - 6:00 PM EST', timeBST: '9:00 PM - 11:00 PM BST', bookedBy: '', isAvailable: true },
    { id: 'sat-5', day: 'Saturday 20th', time: '6:00 PM - 8:00 PM', timeEastern: '6:00 PM - 8:00 PM EST', timeBST: '11:00 PM - 1:00 AM BST', bookedBy: '', isAvailable: true },
    { id: 'sat-6', day: 'Saturday 20th', time: '8:00 PM - 10:00 PM', timeEastern: '8:00 PM - 10:00 PM EST', timeBST: '1:00 AM - 3:00 AM BST', bookedBy: '', isAvailable: true },
    
    // Sunday September 21st - 12 PM to 6 PM Eastern (5 PM - 11 PM BST)
    { id: 'sun-1', day: 'Sunday 21st', time: '12:00 PM - 2:00 PM', timeEastern: '12:00 PM - 2:00 PM EST', timeBST: '5:00 PM - 7:00 PM BST', bookedBy: '', isAvailable: true },
    { id: 'sun-2', day: 'Sunday 21st', time: '2:00 PM - 4:00 PM', timeEastern: '2:00 PM - 4:00 PM EST', timeBST: '7:00 PM - 9:00 PM BST', bookedBy: '', isAvailable: true },
    { id: 'sun-3', day: 'Sunday 21st', time: '4:00 PM - 6:00 PM', timeEastern: '4:00 PM - 6:00 PM EST', timeBST: '9:00 PM - 11:00 PM BST', bookedBy: '', isAvailable: true },
  ])

  const [notes, setNotes] = useState<Notes>({
    specialRequests: '',
    availability: ''
  })

  const [selectedSlot, setSelectedSlot] = useState<string>('')
  const [streamerName, setStreamerName] = useState<string>('')

  const handleSlotClick = (slotId: string) => {
    if (timeSlots.find(slot => slot.id === slotId)?.bookedBy) {
      return // Already booked
    }
    setSelectedSlot(slotId)
    setStreamerName('')
  }

  const handleBookSlot = () => {
    if (!selectedSlot || !streamerName.trim()) return

    setTimeSlots(prev => 
      prev.map(slot => 
        slot.id === selectedSlot 
          ? { ...slot, bookedBy: streamerName.trim(), isAvailable: false }
          : slot
      )
    )
    
    setSelectedSlot('')
    setStreamerName('')
  }

  const handleClearSlot = (slotId: string) => {
    setTimeSlots(prev => 
      prev.map(slot => 
        slot.id === slotId 
          ? { ...slot, bookedBy: '', isAvailable: true }
          : slot
      )
    )
  }

  const groupedSlots = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.day]) {
      acc[slot.day] = []
    }
    acc[slot.day].push(slot)
    return acc
  }, {} as Record<string, TimeSlot[]>)

  const TimeSlotCard = ({ slot }: { slot: TimeSlot }) => {
    const isSelected = selectedSlot === slot.id
    const isBooked = !!slot.bookedBy

    return (
      <div
        className={`time-slot ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
        onClick={() => handleSlotClick(slot.id)}
        tabIndex={0}
        role="button"
        aria-label={`Time slot ${slot.time} ${isBooked ? `booked by ${slot.bookedBy}` : 'available'}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleSlotClick(slot.id)
          }
        }}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="font-semibold text-gray-800">{slot.time}</div>
          {isBooked && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleClearSlot(slot.id)
              }}
              className="text-red-500 hover:text-red-700 text-sm underline"
              aria-label={`Clear booking for ${slot.time}`}
            >
              Clear
            </button>
          )}
        </div>
        
        <div className="text-sm text-gray-600 mb-2">
          <div>Eastern: {slot.timeEastern}</div>
          <div>BST: {slot.timeBST}</div>
        </div>

        {isBooked ? (
          <div className="bg-green-100 border border-green-300 rounded px-2 py-1 text-sm font-medium text-green-800">
            Booked by: {slot.bookedBy}
          </div>
        ) : isSelected ? (
          <div className="bg-primary-100 border border-primary-300 rounded px-2 py-1 text-sm font-medium text-primary-800">
            Selected - Enter name below
          </div>
        ) : (
          <div className="text-gray-500 text-sm">Available</div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Banner */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white py-8 px-6 rounded-2xl shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              🎂 Klayea's Birthday Stream Collab List 🎂
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              September 19-21, 2024 • Choose your 2-hour streaming slot!
            </p>
          </div>
        </div>

        {/* Booking Controls */}
        {selectedSlot && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-primary-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Book Selected Time Slot
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="streamer-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Streaming Name
                </label>
                <input
                  id="streamer-name"
                  type="text"
                  value={streamerName}
                  onChange={(e) => setStreamerName(e.target.value)}
                  placeholder="Enter your name or streaming handle"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                />
              </div>
              <button
                onClick={handleBookSlot}
                disabled={!streamerName.trim()}
                className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Book Slot
              </button>
              <button
                onClick={() => {
                  setSelectedSlot('')
                  setStreamerName('')
                }}
                className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Time Slots by Day */}
        <div className="space-y-8">
          {Object.entries(groupedSlots).map(([day, slots]) => (
            <div key={day} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3">
                {day}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {slots.map((slot) => (
                  <TimeSlotCard key={slot.id} slot={slot} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Special Requests & Availability</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="special-requests" className="block text-sm font-medium text-gray-700 mb-2">
                Special Time Requests or Notes
              </label>
              <textarea
                id="special-requests"
                value={notes.specialRequests}
                onChange={(e) => setNotes(prev => ({ ...prev, specialRequests: e.target.value }))}
                placeholder="e.g., 'I need a specific time slot for timezone reasons' or 'I can only stream on Saturday'"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-y min-h-[120px]"
              />
            </div>
            
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                General Availability (if flexible with scheduling)
              </label>
              <textarea
                id="availability"
                value={notes.availability}
                onChange={(e) => setNotes(prev => ({ ...prev, availability: e.target.value }))}
                placeholder="e.g., 'Available any time Saturday or Sunday' or 'Prefer evening slots on any day'"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-y min-h-[120px]"
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-6 mt-8 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">How to Use:</h3>
          <ul className="list-disc list-inside space-y-2 text-blue-700">
            <li>Click on any available time slot to select it</li>
            <li>Enter your streaming name and click "Book Slot" to reserve it</li>
            <li>You can click "Clear" on any booked slot to remove the booking</li>
            <li>Use the notes section below if you need specific times or have flexible availability</li>
            <li>All times are shown in both Eastern Time (EST) and British Summer Time (BST)</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>🎉 Happy Birthday Klayea! 🎉</p>
          <p className="text-sm mt-2">Made with 💜 for the streaming community</p>
        </div>
      </div>
    </div>
  )
}

export default StreamSchedule
