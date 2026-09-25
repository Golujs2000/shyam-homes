import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { properties as initialPropertiesData } from '../data/properties';
import {
  subscribeToProperties,
  subscribeToLeads,
  subscribeToVisits,
  subscribeToEnquiries,
  subscribeToSettings,
  subscribeToListingRequests,
  savePropertyToFirestore,
  deletePropertyFromFirestore,
  saveLeadToFirestore,
  updateLeadStatusInFirestore,
  deleteLeadFromFirestore,
  saveVisitToFirestore,
  updateVisitStatusInFirestore,
  deleteVisitFromFirestore,
  saveEnquiryToFirestore,
  updateEnquiryStatusInFirestore,
  deleteEnquiryFromFirestore,
  saveSettingsToFirestore,
  seedInitialFirestoreDataIfEmpty,
  forceUploadAllDataToFirestore,
  saveListingRequestToFirestore,
  updateListingRequestStatusInFirestore,
  deleteListingRequestFromFirestore,
} from '../services/firestoreService';

const AdminDataContext = createContext(null);

const STORAGE_KEYS = {
  PROPERTIES: 'shyam_homes_properties_v2',
  LEADS: 'shyam_homes_leads_v2',
  VISITS: 'shyam_homes_visits_v2',
  ENQUIRIES: 'shyam_homes_enquiries_v2',
  SETTINGS: 'shyam_homes_settings_v2',
  AUTH: 'shyam_homes_admin_auth_v2',
  LISTING_REQUESTS: 'shyam_homes_listing_requests_v1',
};

const defaultSettings = {
  consultantName: 'Dhananjay Kumar',
  consultantRole: 'Real Estate & Property Consultant',
  phone: '7858832545',
  whatsapp: '7858832545',
  email: 'info@shyamhomespatna.com',
  address: 'Kankarbagh Main Road, Near Tiwary Bechar, Patna, Bihar - 800020',
  operatingHours: 'Monday - Sunday: 9:00 AM - 8:00 PM',
};

const initialSampleLeads = [
  {
    id: 'lead-1',
    name: 'Alok Nath Singh',
    phone: '9431024567',
    type: 'Seller',
    propertyType: 'Plot',
    locality: 'Danapur',
    area: '2 Kattha (2,720 sq.ft)',
    expectedPrice: '₹ 80 Lakh',
    message: 'Corner residential plot near Danapur Cantt, registry ready.',
    status: 'New',
    createdAt: '2026-09-20T10:15:00Z',
  },
  {
    id: 'lead-2',
    name: 'Pooja Srivastava',
    phone: '9835012345',
    type: 'Buyer',
    propertyType: 'Flat',
    locality: 'Bailey Road',
    budget: '₹ 60 - 75 Lakh',
    message: 'Looking for ready-to-move 3 BHK flat with lift and parking.',
    status: 'Contacted',
    createdAt: '2026-09-19T16:30:00Z',
  },
  {
    id: 'lead-3',
    name: 'Manoj Tripathy',
    phone: '8709456789',
    type: 'Seller',
    propertyType: 'House',
    locality: 'Kankarbagh',
    area: '1,800 sq.ft',
    expectedPrice: '₹ 55 Lakh',
    message: 'Independent duplex house in Doctors Colony, Kankarbagh.',
    status: 'Visit Scheduled',
    createdAt: '2026-09-18T14:20:00Z',
  },
  {
    id: 'lead-4',
    name: 'Vikash Keshri',
    phone: '9122345678',
    type: 'Buyer',
    propertyType: 'Commercial',
    locality: 'Boring Road',
    budget: '₹ 1 - 1.5 Crore',
    message: 'Seeking showroom space on main road for apparel business.',
    status: 'Deal Closed',
    createdAt: '2026-09-15T11:00:00Z',
  }
];

const initialSampleVisits = [
  {
    id: 'visit-1',
    propertyId: 'SH-0001',
    propertyTitle: '3 BHK Independent House in Kankarbagh',
    clientName: 'Suresh Kumar Verma',
    phone: '9876543210',
    date: '2026-09-22',
    time: 'Morning (10:00 AM - 1:00 PM)',
    status: 'Confirmed',
    createdAt: '2026-09-20T09:30:00Z',
  },
  {
    id: 'visit-2',
    propertyId: 'SH-0002',
    propertyTitle: 'Luxury 3 BHK High-Rise Flat on Bailey Road',
    clientName: 'Dr. Anamika Sinha',
    phone: '9470123456',
    date: '2026-09-23',
    time: 'Evening (4:00 PM - 7:00 PM)',
    status: 'Pending',
    createdAt: '2026-09-19T18:45:00Z',
  }
];

const initialSampleEnquiries = [
  {
    id: 'enq-1',
    propertyId: 'SH-0004',
    propertyTitle: 'Commercial Showroom Space on Boring Road',
    clientName: 'Ravi Teja',
    phone: '7004123456',
    email: 'ravi.teja@gmail.com',
    purpose: 'Commercial Space',
    message: 'Is the property eligible for bank commercial loan, and what is the current circle rate?',
    status: 'Unread',
    createdAt: '2026-09-20T11:45:00Z',
  },
  {
    id: 'enq-2',
    propertyId: 'General',
    propertyTitle: 'General Property Consultation',
    clientName: 'Naveen Choudhary',
    phone: '9304123890',
    email: '',
    purpose: 'Buying Property',
    message: 'Looking to invest ₹50 lakh in land or flat near Saguna More corridor.',
    status: 'Resolved',
    createdAt: '2026-09-18T15:10:00Z',
  }
];

export function AdminDataProvider({ children }) {
  // Listing Requests State
  const [listingRequests, setListingRequests] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LISTING_REQUESTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });
  // Properties State
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse properties from localStorage', e);
      }
    }
    return initialPropertiesData;
  });

  // Leads State
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialSampleLeads;
  });

  // Visits State
  const [visits, setVisits] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VISITS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialSampleVisits;
  });

  // Enquiries State
  const [enquiries, setEnquiries] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialSampleEnquiries;
  });

  // Settings State
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return defaultSettings;
  });

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  // Firestore Connection Status State
  const [firestoreStatus, setFirestoreStatus] = useState({
    connected: false,
    syncing: true,
    lastSync: null,
    error: null,
  });

  // Listing requests localStorage sync
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LISTING_REQUESTS, JSON.stringify(listingRequests));
  }, [listingRequests]);

  // Firestore Real-time Subscriptions on Mount
  useEffect(() => {
    let unsubProperties = () => {};
    let unsubLeads = () => {};
    let unsubVisits = () => {};
    let unsubEnquiries = () => {};
    let unsubSettings = () => {};
    let unsubListingRequests = () => {};

    // 1. First attempt to seed if empty
    seedInitialFirestoreDataIfEmpty(
      initialPropertiesData,
      defaultSettings,
      initialSampleLeads,
      initialSampleVisits,
      initialSampleEnquiries
    ).catch((err) => {
      console.warn('Firestore auto-seed notice:', err);
    });

    // 2. Subscribe to Properties
    unsubProperties = subscribeToProperties(
      (remoteProps) => {
        if (Array.isArray(remoteProps) && remoteProps.length > 0) {
          setProperties(remoteProps);
          localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(remoteProps));
        }
        setFirestoreStatus((prev) => ({
          ...prev,
          connected: true,
          syncing: false,
          lastSync: new Date().toLocaleTimeString(),
          error: null,
        }));
      },
      (err) => {
        setFirestoreStatus((prev) => ({
          ...prev,
          syncing: false,
          error: err?.message || 'Firestore connection issue (offline mode active)',
        }));
      }
    );

    // 3. Subscribe to Leads
    unsubLeads = subscribeToLeads((remoteLeads) => {
      if (Array.isArray(remoteLeads) && remoteLeads.length > 0) {
        setLeads(remoteLeads);
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(remoteLeads));
      }
    });

    // 4. Subscribe to Visits
    unsubVisits = subscribeToVisits((remoteVisits) => {
      if (Array.isArray(remoteVisits) && remoteVisits.length > 0) {
        setVisits(remoteVisits);
        localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(remoteVisits));
      }
    });

    // 5. Subscribe to Enquiries
    unsubEnquiries = subscribeToEnquiries((remoteEnqs) => {
      if (Array.isArray(remoteEnqs) && remoteEnqs.length > 0) {
        setEnquiries(remoteEnqs);
        localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(remoteEnqs));
      }
    });

    // 6. Subscribe to Settings
    unsubSettings = subscribeToSettings((remoteSettings) => {
      if (remoteSettings && remoteSettings.phone) {
        setSettings(remoteSettings);
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(remoteSettings));
      }
    });

    // 7. Subscribe to Listing Requests
    unsubListingRequests = subscribeToListingRequests((remoteRequests) => {
      if (Array.isArray(remoteRequests)) {
        setListingRequests(remoteRequests);
        localStorage.setItem(STORAGE_KEYS.LISTING_REQUESTS, JSON.stringify(remoteRequests));
      }
    });

    return () => {
      unsubProperties();
      unsubLeads();
      unsubVisits();
      unsubEnquiries();
      unsubSettings();
      unsubListingRequests();
    };
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(visits));
  }, [visits]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  // Auth Methods
  const login = (username, password) => {
    if (
      (username === 'admin' && password === 'shyam@2026') ||
      (username === 'dhananjay' && password === '7858832545')
    ) {
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials' };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Property CRUD Methods (Writes to Firestore & local state)
  const addProperty = async (newProp) => {
    const id = newProp.id || `prop-${Date.now()}`;
    const propertyId = newProp.propertyId || `SH-${String(properties.length + 1).padStart(4, '0')}`;
    const propertyWithId = {
      ...newProp,
      id,
      propertyId,
      createdAt: new Date().toISOString(),
    };
    setProperties((prev) => [propertyWithId, ...prev.filter((p) => p.id !== id)]);
    await savePropertyToFirestore(propertyWithId);
    return propertyWithId;
  };

  const updateProperty = async (id, updatedData) => {
    const current = properties.find((p) => p.id === id) || {};
    const updated = {
      ...current,
      ...updatedData,
      id,
      updatedAt: new Date().toISOString()
    };
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
    await savePropertyToFirestore(updated);
  };

  const deleteProperty = async (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    await deletePropertyFromFirestore(id);
  };

  const togglePropertyStatus = async (id, newStatus) => {
    const current = properties.find((p) => p.id === id);
    if (!current) return;
    const updated = { ...current, status: newStatus };
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
    await savePropertyToFirestore(updated);
  };

  // Lead Methods (Frontend & Backend -> Firestore)
  const addLead = async (leadData) => {
    const newLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
    await saveLeadToFirestore(newLead);
    return newLead;
  };

  const updateLeadStatus = async (id, status) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    await updateLeadStatusInFirestore(id, status);
  };

  const deleteLead = async (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await deleteLeadFromFirestore(id);
  };

  // Visit Methods (Frontend & Backend -> Firestore)
  const addVisit = async (visitData) => {
    const newVisit = {
      ...visitData,
      id: `visit-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setVisits((prev) => [newVisit, ...prev]);
    await saveVisitToFirestore(newVisit);
    return newVisit;
  };

  const updateVisitStatus = async (id, status) => {
    setVisits((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
    await updateVisitStatusInFirestore(id, status);
  };

  const deleteVisit = async (id) => {
    setVisits((prev) => prev.filter((v) => v.id !== id));
    await deleteVisitFromFirestore(id);
  };

  // Enquiry Methods (Frontend & Backend -> Firestore)
  const addEnquiry = async (enqData) => {
    const newEnquiry = {
      ...enqData,
      id: `enq-${Date.now()}`,
      status: 'Unread',
      createdAt: new Date().toISOString(),
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    await saveEnquiryToFirestore(newEnquiry);
    return newEnquiry;
  };

  const updateEnquiryStatus = async (id, status) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    await updateEnquiryStatusInFirestore(id, status);
  };

  const deleteEnquiry = async (id) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    await deleteEnquiryFromFirestore(id);
  };

  // Settings Method (Writes to Firestore)
  const updateSettings = async (newSettings) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    await saveSettingsToFirestore(merged);
  };

  // Listing Request Methods
  const addListingRequest = async (requestData) => {
    const newRequest = {
      ...requestData,
      id: `lr-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setListingRequests((prev) => [newRequest, ...prev]);
    await saveListingRequestToFirestore(newRequest);
    return newRequest;
  };

  const updateListingRequestStatus = async (id, status) => {
    setListingRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    await updateListingRequestStatusInFirestore(id, status);
  };

  const approveListingRequest = async (request, overrideData = {}) => {
    // Build a property from the listing request
    const newProp = {
      title: overrideData.title || `${request.propertyType} in ${request.locality}`,
      shortTitle: overrideData.shortTitle || `${request.propertyType} – ${request.locality}`,
      type: request.propertyType || 'House',
      category: request.propertyType === 'Plot' ? 'Plots' : request.propertyType === 'Flat' ? 'Flats' : request.propertyType === 'Commercial' ? 'Commercial' : 'Houses',
      status: 'INACTIVE',
      price: request.expectedPrice || 'Price on Request',
      priceNumeric: 0,
      priceNote: 'Negotiable',
      location: `${request.locality}, Patna, Bihar`,
      localityKey: request.locality,
      area: request.area || 'Contact for Details',
      builtUpArea: request.area || '',
      beds: '',
      baths: '',
      balconies: '',
      floor: '',
      parking: '',
      furnishing: 'Unfurnished',
      facing: '',
      possession: 'Ready to Move',
      ownership: 'Freehold',
      roadWidth: '',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      gallery: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'],
      video: '',
      overview: request.message || 'Property listed by owner through Shyam Homes.',
      description: `Owner: ${request.name} (${request.phone}). ${request.message || ''}`,
      locationAdvantage: '',
      suitableFor: '',
      amenities: [],
      nearbyPlaces: [],
      mapQuery: `${request.locality}, Patna, Bihar`,
      listedFromRequest: request.id,
      ...overrideData,
    };
    const savedProp = await addProperty(newProp);
    // Mark listing request as approved
    await updateListingRequestStatus(request.id, 'Approved');
    return savedProp;
  };

  const deleteListingRequest = async (id) => {
    setListingRequests((prev) => prev.filter((r) => r.id !== id));
    await deleteListingRequestFromFirestore(id);
  };

  // Manual Trigger to Sync or Seed with Firestore
  const syncWithFirestore = async () => {
    setFirestoreStatus((prev) => ({ ...prev, syncing: true, error: null }));
    try {
      await forceUploadAllDataToFirestore(
        properties,
        settings,
        leads,
        visits,
        enquiries
      );
      setFirestoreStatus({
        connected: true,
        syncing: false,
        lastSync: new Date().toLocaleTimeString(),
        error: null
      });
      return { success: true };
    } catch (err) {
      console.warn('Firestore sync attempt:', err);
      setFirestoreStatus({
        connected: false,
        syncing: false,
        lastSync: new Date().toLocaleTimeString(),
        error: err.message || 'Permission denied'
      });
      return { success: false, error: err.message };
    }
  };

  // Reset to default starter data
  const resetToDefaultData = () => {
    setProperties(initialPropertiesData);
    setLeads(initialSampleLeads);
    setVisits(initialSampleVisits);
    setEnquiries(initialSampleEnquiries);
    setSettings(defaultSettings);
    syncWithFirestore();
  };

  return (
    <AdminDataContext.Provider
      value={{
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        togglePropertyStatus,

        leads,
        addLead,
        updateLeadStatus,
        deleteLead,

        visits,
        addVisit,
        updateVisitStatus,
        deleteVisit,

        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,

        settings,
        updateSettings,

        listingRequests,
        addListingRequest,
        updateListingRequestStatus,
        approveListingRequest,
        deleteListingRequest,

        isAuthenticated,
        login,
        logout,

        firestoreStatus,
        syncWithFirestore,
        resetToDefaultData,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
}
