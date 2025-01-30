"use client"

import React, { useState, useEffect } from "react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { CalendarDays, Download, Users, Vote, Image, FileImage, IndianRupee, Moon, Sun } from 'lucide-react'

const userData = [
  { name: "PICT", value: 650 },
  { name: "NON-PICT", value: 350 },
]

const paymentData = [
  { name: "Approved", amount: 4500000, count: 120 },
  { name: "Not Approved", amount: 1500000, count: 30 },
]

const transactionTrend = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  amount: Math.floor(Math.random() * 500000) + 100000,
}))

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className={`flex min-h-screen flex-col bg-white dark:bg-gray-900 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">Platform Analytics</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Jan 20, 2023 - Feb 09, 2023
              </span>
            </div>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 py-2 px-4 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
              <Download className="mr-2 h-4 w-4" />
              Download
            </button>
            
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Users</span>
              <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="px-4 pb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">1,000</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +20 from yesterday
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Events</span>
              <CalendarDays className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="px-4 pb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +2 from yesterday
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Registrations</span>
              <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="px-4 pb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">850</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +15 from yesterday
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Picsoreel Entries</span>
              <Image className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="px-4 pb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">156</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +8 from yesterday
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Gallery Entries</span>
              <FileImage className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="px-4 pb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">324</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +12 from yesterday
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Votes Casted</span>
              <Vote className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="px-4 pb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">12,234</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +234 from yesterday
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Transaction Amount</span>
              <IndianRupee className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="px-4 pb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(4523189)}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +{formatCurrency(123456)} from yesterday
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-full lg:col-span-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="px-4 py-4">
              <span className="text-gray-900 dark:text-white text-lg">Daily Transaction Trend</span>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transactionTrend}>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}K`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#f3f4f6', border: 'none' }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-span-full lg:col-span-3 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="px-4 py-4">
              <span className="text-gray-900 dark:text-white text-lg">User Distribution</span>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    fill="#2563eb"
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
