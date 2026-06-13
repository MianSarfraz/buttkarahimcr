'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Clock,
  User,
  BookOpen,
  ShoppingCart,
  Plus,
  Trash2,
  LogOut,
  Utensils,
  LogIn,
  X,
  MoreHorizontal,
  Calendar,
  Phone,
  DollarSign,
  Users
} from 'lucide-react'
import { logoutAdmin } from '../actions'

type Order = {
  id: string
  created_at: string
  customer_name: string
  customer_phone: string
  items: any[]
  total: number
  status: string
  address?: string
}

type Booking = {
  id: string
  created_at: string
  customer_name: string
  customer_phone: string
  date: string
  time: string
  guests: any
  notes: string
  status: string
}

type Employee = {
  id: string
  name: string
  position: string
}

type TimeEntry = {
  id: string
  employee_id: string
  clock_in: string
  clock_out: string | null
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'bookings' | 'employees' | 'time'>('orders')
  const [orders, setOrders] = useState<Order[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [newEmployeeName, setNewEmployeeName] = useState('')
  const [newEmployeePosition, setNewEmployeePosition] = useState('')
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('')
  const [manualClockIn, setManualClockIn] = useState('')
  const [manualClockOut, setManualClockOut] = useState('')
  const [expandedEmployeeId, setExpandedEmployeeId] = useState<string | null>(null)
  const [weekOffset, setWeekOffset] = useState(0)

  const fetchData = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    try {
      const [ordersRes, bookingsRes, employeesRes, timeRes] = await Promise.all([
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('employees').select('*'),
        supabase.from('time_entries').select('*, employees(name)').order('clock_in', { ascending: false })
      ])

      if (ordersRes.data) setOrders(ordersRes.data)
      if (bookingsRes.data) setBookings(bookingsRes.data)
      if (employeesRes.data) setEmployees(employeesRes.data)
      if (timeRes.data) setTimeEntries(timeRes.data as any)
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Employee functions
  const addEmployee = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    try {
      const { error } = await supabase.from('employees').insert({ name: newEmployeeName, position: newEmployeePosition })
      if (error) {
        alert('Error adding employee: ' + error.message)
        return
      }
      setNewEmployeeName('')
      setNewEmployeePosition('')
      fetchData()
    } catch (err) {
      alert('Error adding employee')
    }
  }

  const deleteEmployee = async (id: string) => {
    if (!confirm('Are you sure you want to delete this employee?')) return
    if (!supabase) return
    try {
      const { error } = await supabase.from('employees').delete().eq('id', id)
      if (error) {
        alert('Error deleting employee: ' + error.message)
        return
      }
      fetchData()
    } catch (err) {
      alert('Error deleting employee')
    }
  }

  // Time tracking functions
  const clockInEmployee = async (employeeId: string) => {
    if (!supabase) return
    try {
      const { error } = await supabase.from('time_entries').insert({ employee_id: employeeId, clock_in: new Date().toISOString() })
      if (error) {
        alert('Error clocking in: ' + error.message)
        return
      }
      fetchData()
    } catch (err) {
      alert('Error clocking in')
    }
  }

  const clockOutEmployee = async (entryId: string) => {
    if (!supabase) return
    try {
      const { error } = await supabase.from('time_entries').update({ clock_out: new Date().toISOString() }).eq('id', entryId)
      if (error) {
        alert('Error clocking out: ' + error.message)
        return
      }
      fetchData()
    } catch (err) {
      alert('Error clocking out')
    }
  }

  const deleteTimeEntry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this time entry?')) return
    if (!supabase) return
    try {
      const { error } = await supabase.from('time_entries').delete().eq('id', id)
      if (error) {
        alert('Error deleting time entry: ' + error.message)
        return
      }
      fetchData()
    } catch (err) {
      alert('Error deleting time entry')
    }
  }

  const addManualTimeEntry = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    if (manualClockOut && new Date(manualClockOut) <= new Date(manualClockIn)) {
      alert('Error: Clock-out time must be after Clock-in time.')
      return
    }
    try {
      const { error } = await supabase.from('time_entries').insert({
        employee_id: selectedEmployeeId,
        clock_in: new Date(manualClockIn).toISOString(),
        clock_out: manualClockOut ? new Date(manualClockOut).toISOString() : null
      })
      if (error) {
        alert('Error adding manual entry: ' + error.message)
        return
      }
      setSelectedEmployeeId('')
      setManualClockIn('')
      setManualClockOut('')
      fetchData()
    } catch (err) {
      alert('Error adding manual entry')
    }
  }

  // Order functions
  const updateOrderStatus = async (id: string, status: string) => {
    if (!supabase) return
    try {
      const { error } = await supabase.from('orders').update({ status }).eq('id', id)
      if (error) {
        alert('Error updating order: ' + error.message)
        return
      }
      fetchData()
    } catch (err) {
      alert('Error updating order')
    }
  }

  const deleteOrder = async (id: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return
    if (!supabase) return
    try {
      const { error } = await supabase.from('orders').delete().eq('id', id)
      if (error) {
        alert('Error deleting order: ' + error.message)
        return
      }
      fetchData()
    } catch (err) {
      alert('Error deleting order')
    }
  }

  // Booking functions
  const updateBookingStatus = async (id: string, status: string) => {
    if (!supabase) return
    try {
      const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
      if (error) {
        alert('Error updating booking: ' + error.message)
        return
      }
      fetchData()
    } catch (err) {
      alert('Error updating booking')
    }
  }

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return
    if (!supabase) return
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id)
      if (error) {
        alert('Error deleting booking: ' + error.message)
        return
      }
      fetchData()
    } catch (err) {
      alert('Error deleting booking')
    }
  }

  const getUKTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-GB', { timeZone: 'Europe/London' })
  }

  const getOrderDateLabel = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    const isToday = date.toDateString() === today.toDateString()
    const isYesterday = date.toDateString() === yesterday.toDateString()

    if (isToday) return 'Today'
    if (isYesterday) return 'Yesterday'

    return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  }

  const getOrderTimeOnly = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/London' })
  }

  const getDuration = (inStr: string, outStr: string | null) => {
    const start = new Date(inStr).getTime()
    const end = outStr ? new Date(outStr).getTime() : Date.now()
    const diffMs = end - start
    if (diffMs < 0) return '0m'
    const diffMins = Math.floor(diffMs / 60000)
    const hrs = Math.floor(diffMins / 60)
    const mins = diffMins % 60
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`
  }

  const getStats = () => {
    const today = new Date().toISOString().split('T')[0]
    const todayOrders = orders.filter(o => o.created_at.startsWith(today))
    const todayRevenue = todayOrders.reduce((sum, o) => sum + (o.total || 0), 0)
    const pendingBookings = bookings.filter(b => b.status === 'pending')

    return {
      totalOrders: orders.length,
      todayRevenue,
      pendingBookings: pendingBookings.length,
      totalEmployees: employees.length
    }
  }

  const stats = getStats()

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="bg-slate-800 p-8 rounded-xl text-center">
          <Utensils className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Supabase Not Configured</h1>
          <button
            onClick={() => logoutAdmin()}
            className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Butt Karahi Admin</h1>
          </div>
          <button
            onClick={() => logoutAdmin()}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-lg transition border border-slate-700"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-5 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.totalOrders}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-white/90" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 p-5 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm font-medium">Today's Revenue</p>
                <p className="text-3xl font-bold text-white mt-1">£{stats.todayRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-white/90" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-5 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm font-medium">Pending Bookings</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.pendingBookings}</p>
              </div>
              <Calendar className="w-8 h-8 text-white/90" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-5 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Total Employees</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.totalEmployees}</p>
              </div>
              <Users className="w-8 h-8 text-white/90" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 bg-slate-900 p-2 rounded-xl border border-slate-800">
          {[
            { id: 'orders', icon: ShoppingCart, label: 'Orders' },
            { id: 'bookings', icon: BookOpen, label: 'Bookings' },
            { id: 'employees', icon: User, label: 'Employees' },
            { id: 'time', icon: Clock, label: 'Time Tracking' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          {loading && <div className="p-10 text-center text-slate-400">Loading...</div>}

          {/* Orders Tab */}
          {activeTab === 'orders' && !loading && (() => {
            const groupedOrders: { [key: string]: Order[] } = {}
            orders.forEach(order => {
              const dateLabel = getOrderDateLabel(order.created_at)
              if (!groupedOrders[dateLabel]) {
                groupedOrders[dateLabel] = []
              }
              groupedOrders[dateLabel].push(order)
            })

            return (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h2 className="text-2xl font-bold text-white">Orders</h2>
                  <span className="text-slate-400 text-xs font-semibold bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                    Total: {orders.length}
                  </span>
                </div>
                {orders.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">No orders yet</div>
                ) : (
                  <div className="space-y-8">
                    {Object.entries(groupedOrders).map(([dateLabel, dateOrders]) => (
                      <div key={dateLabel} className="space-y-3">
                        <div className="sticky top-0 bg-slate-900 z-10 py-2">
                          <h3 className="text-sm font-bold text-orange-500 uppercase tracking-wider bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-lg inline-block">
                            {dateLabel}
                          </h3>
                        </div>
                        <div className="space-y-2.5">
                          {dateOrders.map((order) => (
                            <div key={order.id} className="grid grid-cols-1 xl:grid-cols-12 gap-4 p-4 items-center bg-slate-950/40 hover:bg-slate-950/80 border border-slate-800/80 rounded-xl transition duration-200">
                              {/* Customer / Time Column */}
                              <div className="xl:col-span-3 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="bg-orange-500/10 text-orange-400 text-xs font-bold px-2 py-0.5 rounded border border-orange-500/20">
                                    {getOrderTimeOnly(order.created_at)}
                                  </span>
                                  <span className="font-bold text-white text-sm">{order.customer_name}</span>
                                </div>
                                <div className="text-slate-400 text-xs flex items-center gap-1.5">
                                  <Phone size={12} className="text-slate-500" />
                                  {order.customer_phone || 'No Phone'}
                                </div>
                              </div>

                              {/* Order Items Column */}
                              <div className="xl:col-span-4 space-y-1.5 border-t xl:border-t-0 xl:border-l border-slate-800/80 pt-2.5 xl:pt-0 xl:pl-4">
                                <span className="text-slate-500 font-semibold uppercase tracking-wider text-[9px] block">Items</span>
                                {Array.isArray(order.items) && order.items.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {order.items.map((item, idx) => {
                                      const itemText = typeof item === 'string'
                                        ? item
                                        : item.quantity
                                          ? `${item.quantity}x ${item.name || 'Item'}`
                                          : JSON.stringify(item);
                                      return (
                                        <span key={idx} className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-200 text-xs">
                                          {itemText}
                                        </span>
                                      )
                                    })}
                                  </div>
                                ) : (
                                  <span className="text-slate-500 italic text-xs">No items</span>
                                )}
                              </div>

                              {/* Delivery Address Column */}
                              <div className="xl:col-span-3 space-y-1 border-t xl:border-t-0 xl:border-l border-slate-800/80 pt-2.5 xl:pt-0 xl:pl-4">
                                <span className="text-slate-500 font-semibold uppercase tracking-wider text-[9px] block">Delivery Address</span>
                                <span className="text-slate-300 text-xs line-clamp-1 hover:line-clamp-none transition-all cursor-help block" title={order.address || 'Not provided'}>
                                  {order.address || 'Not provided'}
                                </span>
                              </div>

                              {/* Total / Status / Actions Column */}
                              <div className="xl:col-span-2 flex items-center justify-between xl:justify-end gap-3 border-t xl:border-t-0 xl:border-l border-slate-800/80 pt-2.5 xl:pt-0 xl:pl-4">
                                <div className="text-left xl:text-right">
                                  <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider block">Total</span>
                                  <span className="text-orange-400 font-bold text-sm">£{order.total?.toFixed(2) || '0.00'}</span>
                                </div>
                                <select
                                  value={order.status}
                                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                  className="bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-orange-500"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="preparing">Preparing</option>
                                  <option value="ready">Ready</option>
                                  <option value="delivered">Delivered</option>
                                </select>
                                <button
                                  onClick={() => deleteOrder(order.id)}
                                  className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })()}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && !loading && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Bookings</h2>
              {bookings.length === 0 ? (
                <div className="text-center py-12 text-slate-400">No bookings yet</div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="font-semibold text-white">{booking.customer_name}</div>
                          <div className="text-slate-400 text-sm mt-1">
                            <Calendar size={14} className="inline mr-1" />
                            {booking.date} at {booking.time} • {booking.guests} {Number(booking.guests) === 1 ? 'Guest' : 'Guests'}
                          </div>
                          <div className="text-slate-400 text-sm">
                            <Phone size={14} className="inline mr-1" />
                            {booking.customer_phone}
                          </div>
                          {booking.notes && (
                            <div className="text-slate-400 text-sm mt-1 italic">{booking.notes}</div>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                            className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Employees Tab */}
          {activeTab === 'employees' && !loading && (() => {
            // --- Week range helpers ---
            const getWeekStart = (offset: number) => {
              const now = new Date()
              const day = now.getDay() // 0=Sun
              const diffToMon = (day === 0 ? -6 : 1 - day)
              const monday = new Date(now)
              monday.setDate(now.getDate() + diffToMon + offset * 7)
              monday.setHours(0, 0, 0, 0)
              return monday
            }
            const weekStart = getWeekStart(weekOffset)
            const weekEnd = new Date(weekStart)
            weekEnd.setDate(weekStart.getDate() + 6)
            weekEnd.setHours(23, 59, 59, 999)

            const formatWeekLabel = () => {
              const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
              const s = weekStart.toLocaleDateString('en-GB', opts)
              const e = weekEnd.toLocaleDateString('en-GB', { ...opts, year: 'numeric' })
              return `${s} – ${e}`
            }

            const getShiftsForEmployeeInWeek = (empId: string) =>
              timeEntries.filter((entry) => {
                const ci = new Date(entry.clock_in)
                return entry.employee_id === empId && ci >= weekStart && ci <= weekEnd
              })

            const calcHours = (entry: TimeEntry) => {
              const start = new Date(entry.clock_in).getTime()
              const end = entry.clock_out ? new Date(entry.clock_out).getTime() : Date.now()
              const diff = (end - start) / (1000 * 60 * 60)
              return diff > 0 ? diff : 0
            }

            const totalHoursInWeek = (empId: string) =>
              getShiftsForEmployeeInWeek(empId).reduce((sum, e) => sum + calcHours(e), 0)

            const allShiftsForEmployee = (empId: string) =>
              timeEntries.filter((e) => e.employee_id === empId)

            return (
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Employees & Shift Records</h2>
                    <p className="text-slate-400 text-sm mt-1">View shift history per employee, organised by week.</p>
                  </div>
                </div>

                {/* Add Employee Form */}
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Add New Employee</h3>
                  <form onSubmit={addEmployee} className="flex flex-col md:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Employee Name"
                      value={newEmployeeName}
                      onChange={(e) => setNewEmployeeName(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition text-sm"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Position / Role"
                      value={newEmployeePosition}
                      onChange={(e) => setNewEmployeePosition(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition text-sm"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-2.5 rounded-xl transition flex items-center gap-2 justify-center text-sm font-semibold shadow-lg shadow-green-950/20"
                    >
                      <Plus size={16} />
                      Add Employee
                    </button>
                  </form>
                </div>

                {employees.length === 0 ? (
                  <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-12 text-center">
                    <User className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">No employees added yet.</p>
                  </div>
                ) : (
                  <>
                    {/* Week Navigator */}
                    <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-2xl px-5 py-3">
                      <button
                        onClick={() => setWeekOffset(w => w - 1)}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white px-3 py-1.5 rounded-xl hover:bg-slate-800 transition text-sm font-medium"
                      >
                        <MoreHorizontal size={14} className="rotate-180" />
                        Prev Week
                      </button>
                      <div className="text-center">
                        <div className="text-white font-bold text-sm">{formatWeekLabel()}</div>
                        {weekOffset === 0 && (
                          <div className="text-orange-400 text-xs font-semibold mt-0.5">This Week</div>
                        )}
                        {weekOffset !== 0 && (
                          <button
                            onClick={() => setWeekOffset(0)}
                            className="text-orange-400 text-xs font-semibold hover:text-orange-300 transition mt-0.5"
                          >
                            Back to This Week
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => setWeekOffset(w => Math.min(w + 1, 0))}
                        disabled={weekOffset === 0}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none px-3 py-1.5 rounded-xl hover:bg-slate-800 transition text-sm font-medium"
                      >
                        Next Week
                        <MoreHorizontal size={14} />
                      </button>
                    </div>

                    {/* Employee Cards */}
                    <div className="space-y-4">
                      {employees.map((emp) => {
                        const weekShifts = getShiftsForEmployeeInWeek(emp.id)
                        const hoursThisWeek = totalHoursInWeek(emp.id)
                        const allShifts = allShiftsForEmployee(emp.id)
                        const totalHoursAll = allShifts.reduce((sum, e) => sum + calcHours(e), 0)
                        const isExpanded = expandedEmployeeId === emp.id
                        const isClockedIn = timeEntries.some(e => e.employee_id === emp.id && !e.clock_out)

                        return (
                          <div
                            key={emp.id}
                            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                              isExpanded ? 'border-orange-500/30 shadow-lg shadow-orange-950/10' : 'border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            {/* Employee Summary Header */}
                            <div
                              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/50 cursor-pointer"
                              onClick={() => setExpandedEmployeeId(isExpanded ? null : emp.id)}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-md ${
                                  isClockedIn
                                    ? 'bg-gradient-to-br from-green-600 to-green-700 text-white'
                                    : 'bg-slate-800 text-slate-400'
                                }`}>
                                  {emp.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-bold text-white text-base flex items-center gap-2">
                                    {emp.name}
                                    {isClockedIn && (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-[10px] font-bold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        Active
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-slate-400 text-xs mt-0.5">{emp.position}</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-6">
                                {/* This week stats */}
                                <div className="text-center">
                                  <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">This Week</div>
                                  <div className="text-white font-bold text-lg">{weekShifts.length}</div>
                                  <div className="text-slate-400 text-[10px]">{weekShifts.length === 1 ? 'shift' : 'shifts'}</div>
                                </div>
                                <div className="w-px h-10 bg-slate-800" />
                                <div className="text-center">
                                  <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Hrs This Wk</div>
                                  <div className="text-orange-400 font-bold text-lg">{hoursThisWeek.toFixed(1)}</div>
                                  <div className="text-slate-400 text-[10px]">hrs</div>
                                </div>
                                <div className="w-px h-10 bg-slate-800" />
                                <div className="text-center">
                                  <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">All Time</div>
                                  <div className="text-blue-400 font-bold text-lg">{totalHoursAll.toFixed(0)}</div>
                                  <div className="text-slate-400 text-[10px]">hrs total</div>
                                </div>
                                <div className="w-px h-10 bg-slate-800" />
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); deleteEmployee(emp.id) }}
                                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                  <div className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                    <DollarSign size={16} className="rotate-90" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Expanded: Weekly Shift Details */}
                            {isExpanded && (
                              <div className="border-t border-slate-800 bg-slate-950/40 p-5 space-y-5">
                                {/* Week Summary Banner */}
                                <div className="flex flex-wrap gap-3">
                                  <div className="flex-1 min-w-[120px] bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Shifts This Week</div>
                                    <div className="text-white text-2xl font-bold mt-1">{weekShifts.length}</div>
                                  </div>
                                  <div className="flex-1 min-w-[120px] bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Hours This Week</div>
                                    <div className="text-orange-400 text-2xl font-bold mt-1">{hoursThisWeek.toFixed(1)}h</div>
                                  </div>
                                  <div className="flex-1 min-w-[120px] bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Total Shifts Ever</div>
                                    <div className="text-blue-400 text-2xl font-bold mt-1">{allShifts.length}</div>
                                  </div>
                                  <div className="flex-1 min-w-[120px] bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">All-Time Hours</div>
                                    <div className="text-purple-400 text-2xl font-bold mt-1">{totalHoursAll.toFixed(1)}h</div>
                                  </div>
                                </div>

                                {/* This week's shifts */}
                                <div>
                                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Shifts This Week — {formatWeekLabel()}</h4>
                                  {weekShifts.length === 0 ? (
                                    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 text-center text-slate-500 italic text-sm">
                                      No shifts recorded for this week.
                                    </div>
                                  ) : (
                                    <div className="space-y-2">
                                      {weekShifts.map((entry, idx) => {
                                        const hrs = calcHours(entry)
                                        const dayName = new Date(entry.clock_in).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })
                                        return (
                                          <div key={entry.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/60 rounded-xl px-4 py-3">
                                            <div className="flex items-center gap-3">
                                              <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-xs font-bold">
                                                {idx + 1}
                                              </div>
                                              <div>
                                                <div className="text-white text-sm font-semibold">{dayName}</div>
                                                <div className="flex items-center gap-3 mt-0.5">
                                                  <span className="flex items-center gap-1 text-green-400 text-xs">
                                                    <LogIn size={11} />
                                                    {getUKTime(entry.clock_in)}
                                                  </span>
                                                  {entry.clock_out ? (
                                                    <span className="flex items-center gap-1 text-red-400 text-xs">
                                                      <X size={11} />
                                                      {getUKTime(entry.clock_out)}
                                                    </span>
                                                  ) : (
                                                    <span className="text-green-400 text-xs font-semibold flex items-center gap-1">
                                                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                                      Still Active
                                                    </span>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                              <span className="text-orange-400 font-bold text-sm">{getDuration(entry.clock_in, entry.clock_out)}</span>
                                              <span className="text-slate-500 text-xs">({hrs.toFixed(2)} hrs)</span>
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  )}
                                </div>

                                {/* Last 5 historical shifts */}
                                {allShifts.filter(e => !(getShiftsForEmployeeInWeek(emp.id).map(x => x.id).includes(e.id))).slice(0, 5).length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Recent Previous Shifts</h4>
                                    <div className="space-y-2">
                                      {allShifts
                                        .filter(e => !(getShiftsForEmployeeInWeek(emp.id).map(x => x.id).includes(e.id)))
                                        .slice(0, 5)
                                        .map((entry) => {
                                          const hrs = calcHours(entry)
                                          const dayName = new Date(entry.clock_in).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: '2-digit' })
                                          return (
                                            <div key={entry.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/30 border border-slate-800/40 rounded-xl px-4 py-3 opacity-70 hover:opacity-100 transition">
                                              <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                                                  <Calendar size={12} />
                                                </div>
                                                <div>
                                                  <div className="text-slate-300 text-sm">{dayName}</div>
                                                  <div className="flex items-center gap-3 mt-0.5">
                                                    <span className="flex items-center gap-1 text-green-400/70 text-xs">
                                                      <LogIn size={10} />
                                                      {getUKTime(entry.clock_in)}
                                                    </span>
                                                    {entry.clock_out && (
                                                      <span className="flex items-center gap-1 text-red-400/70 text-xs">
                                                        <X size={10} />
                                                        {getUKTime(entry.clock_out)}
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                              <span className="text-slate-400 font-semibold text-sm">{getDuration(entry.clock_in, entry.clock_out)}</span>
                                            </div>
                                          )
                                        })
                                      }
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>
            )
          })()}

          {/* Time Tracking Tab */}
          {activeTab === 'time' && !loading && (
            <div className="p-6 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Time Tracking & Attendance</h2>
                  <p className="text-slate-400 text-sm mt-1">Manage employee shifts, log attendance, and review hours worked.</p>
                </div>
              </div>

              {/* Employee Status Grid */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  Employee Attendance Status
                </h3>
                {employees.length === 0 ? (
                  <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 text-center text-slate-400">
                    <User className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p>No employees registered. Add employees in the "Employees" tab first.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {employees.map((emp) => {
                      const activeEntry = timeEntries.find(
                        (entry) => entry.employee_id === emp.id && !entry.clock_out
                      )
                      const isClockedIn = !!activeEntry
                      const totalWorkedHours = timeEntries
                        .filter((entry) => entry.employee_id === emp.id)
                        .reduce((sum, entry) => {
                          const start = new Date(entry.clock_in).getTime()
                          const end = entry.clock_out ? new Date(entry.clock_out).getTime() : Date.now()
                          const diff = (end - start) / (1000 * 60 * 60)
                          return sum + (diff > 0 ? diff : 0)
                        }, 0)

                      return (
                        <div
                          key={emp.id}
                          className={`p-5 rounded-2xl border transition-all duration-300 ${
                            isClockedIn
                              ? 'bg-gradient-to-br from-green-950/40 to-slate-900 border-green-500/30 hover:border-green-500/50 shadow-lg shadow-green-950/20'
                              : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-white text-base">{emp.name}</h4>
                              <p className="text-slate-400 text-xs mt-0.5">{emp.position}</p>
                            </div>
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                isClockedIn
                                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                  : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  isClockedIn ? 'bg-green-500 animate-pulse' : 'bg-slate-500'
                                }`}
                              />
                              {isClockedIn ? 'Clocked In' : 'Clocked Out'}
                            </span>
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                            <div>
                              <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Total Hours</div>
                              <div className="text-white font-semibold text-sm mt-0.5">{totalWorkedHours.toFixed(1)} hrs</div>
                            </div>
                            {isClockedIn ? (
                              <div>
                                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Current Shift</div>
                                <div className="text-green-400 font-semibold text-xs mt-0.5">
                                  {getDuration(activeEntry.clock_in, null)}
                                </div>
                              </div>
                            ) : null}
                          </div>

                          <div className="mt-4">
                            {isClockedIn ? (
                              <button
                                onClick={() => clockOutEmployee(activeEntry.id)}
                                className="w-full py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-semibold rounded-xl transition duration-200 shadow-md shadow-red-950/30 flex items-center justify-center gap-2"
                              >
                                <X size={16} />
                                Clock Out
                              </button>
                            ) : (
                              <button
                                onClick={() => clockInEmployee(emp.id)}
                                className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-xl transition duration-200 shadow-md shadow-blue-950/30 flex items-center justify-center gap-2"
                              >
                                <LogIn size={16} />
                                Clock In
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Manual Entry Form */}
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 max-w-xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-orange-500" />
                  Log Manual Shift Entry
                </h3>
                <form onSubmit={addManualTimeEntry} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Employee</label>
                      <select
                        value={selectedEmployeeId}
                        onChange={(e) => setSelectedEmployeeId(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition"
                        required
                      >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                          <option key={emp.id} value={emp.id}>
                            {emp.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Clock In Time</label>
                      <input
                        type="datetime-local"
                        value={manualClockIn}
                        onChange={(e) => setManualClockIn(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Clock Out Time (Optional)</label>
                      <input
                        type="datetime-local"
                        value={manualClockOut}
                        onChange={(e) => setManualClockOut(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-950/20 transform hover:-translate-y-0.5 transition duration-200 text-sm flex items-center justify-center gap-2"
                      >
                        <Plus size={16} />
                        Add Shift Record
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Time Entries Table */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  Recent Shift History
                </h3>
                <div className="overflow-hidden rounded-2xl border border-slate-800">
                  <table className="w-full border-collapse bg-slate-900/20">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/60">
                        <th className="text-left py-4 px-6 text-slate-400 text-xs font-bold uppercase tracking-wider">Employee</th>
                        <th className="text-left py-4 px-6 text-slate-400 text-xs font-bold uppercase tracking-wider">Clock In</th>
                        <th className="text-left py-4 px-6 text-slate-400 text-xs font-bold uppercase tracking-wider">Clock Out</th>
                        <th className="text-left py-4 px-6 text-slate-400 text-xs font-bold uppercase tracking-wider">Duration</th>
                        <th className="text-left py-4 px-6 text-slate-400 text-xs font-bold uppercase tracking-wider">Action</th>
                        <th className="text-center py-4 px-6 text-slate-400 text-xs font-bold uppercase tracking-wider">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {timeEntries.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-500 italic">
                            No shift records logged yet.
                          </td>
                        </tr>
                      ) : (
                        timeEntries.map((entry) => (
                          <tr key={entry.id} className="hover:bg-slate-800/20 transition-colors">
                            <td className="py-4 px-6 text-white font-semibold text-sm">
                              {(entry as any).employees?.name || 'Unknown'}
                            </td>
                            <td className="py-4 px-6 text-slate-300 text-sm">
                              <div className="flex items-center gap-2">
                                <LogIn size={14} className="text-green-500" />
                                {getUKTime(entry.clock_in)}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-slate-300 text-sm">
                              {entry.clock_out ? (
                                <div className="flex items-center gap-2">
                                  <X size={14} className="text-red-400" />
                                  {getUKTime(entry.clock_out)}
                                </div>
                              ) : (
                                <span className="text-green-400 font-semibold flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                  Active Shift
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-orange-400 font-bold text-sm">
                              {getDuration(entry.clock_in, entry.clock_out)}
                            </td>
                            <td className="py-4 px-6">
                              {!entry.clock_out && (
                                <button
                                  onClick={() => clockOutEmployee(entry.id)}
                                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-md shadow-red-950/20 transition duration-200"
                                >
                                  Clock Out
                                </button>
                              )}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <button
                                onClick={() => deleteTimeEntry(entry.id)}
                                className="p-2 text-slate-500 hover:text-red-400 bg-slate-800/40 hover:bg-red-500/10 rounded-lg transition"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
