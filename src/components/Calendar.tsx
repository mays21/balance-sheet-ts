// import React from 'react'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja"
import { DatesSetArg, EventContentArg } from "@fullcalendar/core/index.js";
import "../calendar.css"
import { Balance, CalendarContent, Transaction } from "../types";
import { calculateDailyBalances } from "../utiles/financeCalculations";
import { formatCurrency } from "../utiles/formatting";

interface CalendarProps {
  monthlyTransactions: Transaction[]
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const Calendar = ( {monthlyTransactions, setCurrentMonth}: CalendarProps) => {

  // 1. 日付ごとの収支を計算する関数
  const dailyBalances = calculateDailyBalances(monthlyTransactions)
  console.log('Calendar:',dailyBalances);

  // 2.FullCalendar用のイベントを生成する関数
  const createCalendarEvents = (dailyBalances :Record<string, Balance>):CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const {income, expense, balance} =  dailyBalances[date]
      return {
        start:date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      }
    })
  }

  const calendarEvents = createCalendarEvents(dailyBalances);
  console.log('Events:', calendarEvents);
    
  // a custom render function
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <>
        <div className='money' id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className='money' id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className='money' id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </>
    )
  }
const hundleDatesSet = (datesetInfo:DatesSetArg) => {
  console.log(datesetInfo);
  setCurrentMonth(datesetInfo.view.currentStart);
}

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      events={calendarEvents}
      eventContent={renderEventContent}
      datesSet={hundleDatesSet}
    />
  )
}

export default Calendar