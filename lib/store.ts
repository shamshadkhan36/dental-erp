'use client';

import { useState, useEffect } from 'react';
import {
  BrandProfile,
  CalendarItem,
  ContentRecord,
  FlyerRecord,
  AnalyticsSummary,
  CreditUsage,
  DentalOffer,
  PostStatus
} from '../types';
import {
  defaultBrandProfile,
  defaultCalendarItems,
  defaultContentRecords,
  defaultFlyers,
  defaultAnalytics,
  defaultCreditUsage
} from './default-data';
import { runQualityCheck } from './qc-engine';

const STORAGE_KEYS = {
  BRAND: 'dental_erp_brand',
  CALENDAR: 'dental_erp_calendar',
  CONTENT: 'dental_erp_content',
  FLYERS: 'dental_erp_flyers',
  ANALYTICS: 'dental_erp_analytics',
  CREDITS: 'dental_erp_credits'
};

export function useERPStore() {
  const [brand, setBrandState] = useState<BrandProfile>(defaultBrandProfile);
  const [calendar, setCalendarState] = useState<CalendarItem[]>(defaultCalendarItems);
  const [contentRecords, setContentRecordsState] = useState<ContentRecord[]>(defaultContentRecords);
  const [flyers, setFlyersState] = useState<FlyerRecord[]>(defaultFlyers);
  const [analytics, setAnalyticsState] = useState<AnalyticsSummary>(defaultAnalytics);
  const [creditUsage, setCreditUsageState] = useState<CreditUsage>(defaultCreditUsage);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedBrand = localStorage.getItem(STORAGE_KEYS.BRAND);
      if (storedBrand) setBrandState(JSON.parse(storedBrand));

      const storedCalendar = localStorage.getItem(STORAGE_KEYS.CALENDAR);
      if (storedCalendar) setCalendarState(JSON.parse(storedCalendar));

      const storedContent = localStorage.getItem(STORAGE_KEYS.CONTENT);
      if (storedContent) setContentRecordsState(JSON.parse(storedContent));

      const storedFlyers = localStorage.getItem(STORAGE_KEYS.FLYERS);
      if (storedFlyers) setFlyersState(JSON.parse(storedFlyers));

      const storedAnalytics = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      if (storedAnalytics) setAnalyticsState(JSON.parse(storedAnalytics));

      const storedCredits = localStorage.getItem(STORAGE_KEYS.CREDITS);
      if (storedCredits) setCreditUsageState(JSON.parse(storedCredits));
    } catch (e) {
      console.warn("Could not load from localStorage, using defaults", e);
    }
    setIsLoaded(true);
  }, []);

  // Update brand
  const updateBrand = (updated: BrandProfile) => {
    setBrandState(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Add / Update Offer
  const saveOffer = (offer: DentalOffer) => {
    setBrandState(prev => {
      const exists = prev.offers.some(o => o.id === offer.id);
      const updatedOffers = exists
        ? prev.offers.map(o => (o.id === offer.id ? offer : o))
        : [...prev.offers, offer];
      const nextBrand = { ...prev, offers: updatedOffers };
      try {
        localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(nextBrand));
      } catch (e) {
        console.error(e);
      }
      return nextBrand;
    });
  };

  const deleteOffer = (offerId: string) => {
    setBrandState(prev => {
      const nextBrand = { ...prev, offers: prev.offers.filter(o => o.id !== offerId) };
      try {
        localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(nextBrand));
      } catch (e) {
        console.error(e);
      }
      return nextBrand;
    });
  };

  // Add / Update Content Record
  const saveContentRecord = (record: ContentRecord) => {
    const qc = runQualityCheck(record, brand);
    const checkedRecord = { ...record, qcResults: qc };

    setContentRecordsState(prev => {
      const exists = prev.some(r => r.id === checkedRecord.id);
      const next = exists
        ? prev.map(r => (r.id === checkedRecord.id ? checkedRecord : r))
        : [checkedRecord, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });

    if (checkedRecord.calendarItemId) {
      updateCalendarItemStatus(checkedRecord.calendarItemId, checkedRecord.status, checkedRecord.id);
    }
  };

  // Update status (Approve, Request Changes, Schedule, Publish)
  const updateContentStatus = (id: string, newStatus: PostStatus, note?: string) => {
    setContentRecordsState(prev => {
      const next = prev.map(r => {
        if (r.id === id) {
          const updated: ContentRecord = {
            ...r,
            status: newStatus,
            approvalNotes: note || r.approvalNotes,
            publishedAt: newStatus === 'published' ? new Date().toISOString() : r.publishedAt,
            scheduledAt: newStatus === 'scheduled' && !r.scheduledAt ? new Date(Date.now() + 86400000 * 2).toISOString() : r.scheduledAt
          };

          if (r.calendarItemId) {
            updateCalendarItemStatus(r.calendarItemId, newStatus, r.id);
          }
          return updated;
        }
        return r;
      });
      try {
        localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Update calendar item
  const updateCalendarItemStatus = (calendarId: string, status: PostStatus, contentRecordId?: string) => {
    setCalendarState(prev => {
      const next = prev.map(item => {
        if (item.id === calendarId) {
          return {
            ...item,
            status,
            contentRecordId: contentRecordId || item.contentRecordId
          };
        }
        return item;
      });
      try {
        localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Add Calendar Item
  const addCalendarItem = (item: CalendarItem) => {
    setCalendarState(prev => {
      const next = [...prev, item];
      try {
        localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Save flyer
  const saveFlyer = (flyer: FlyerRecord) => {
    setFlyersState(prev => {
      const exists = prev.some(f => f.id === flyer.id);
      const next = exists
        ? prev.map(f => (f.id === flyer.id ? flyer : f))
        : [flyer, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.FLYERS, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Reset to default sample data
  const resetToDefaults = () => {
    localStorage.clear();
    setBrandState(defaultBrandProfile);
    setCalendarState(defaultCalendarItems);
    setContentRecordsState(defaultContentRecords);
    setFlyersState(defaultFlyers);
    setAnalyticsState(defaultAnalytics);
    setCreditUsageState(defaultCreditUsage);
  };

  return {
    isLoaded,
    brand,
    calendar,
    contentRecords,
    flyers,
    analytics,
    creditUsage,
    updateBrand,
    saveOffer,
    deleteOffer,
    saveContentRecord,
    updateContentStatus,
    addCalendarItem,
    saveFlyer,
    resetToDefaults
  };
}
