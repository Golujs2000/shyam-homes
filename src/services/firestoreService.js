import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  orderBy,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';

export const COLLECTIONS = {
  PROPERTIES: 'properties',
  LEADS: 'leads',
  VISITS: 'visits',
  ENQUIRIES: 'enquiries',
  SETTINGS: 'settings'
};

/**
 * Subscribe to real-time properties from Firestore
 */
export function subscribeToProperties(onSuccess, onError) {
  try {
    const q = query(collection(db, COLLECTIONS.PROPERTIES));
    return onSnapshot(
      q,
      (snapshot) => {
        const items = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() });
        });
        // Sort by createdAt descending if present
        items.sort((a, b) => {
          const tA = new Date(a.createdAt || 0).getTime();
          const tB = new Date(b.createdAt || 0).getTime();
          return tB - tA;
        });
        onSuccess(items);
      },
      (err) => {
        console.warn('Firestore properties snapshot error:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    console.warn('Firestore subscription failed:', err);
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Subscribe to real-time leads from Firestore
 */
export function subscribeToLeads(onSuccess, onError) {
  try {
    const q = query(collection(db, COLLECTIONS.LEADS));
    return onSnapshot(
      q,
      (snapshot) => {
        const items = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() });
        });
        items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        onSuccess(items);
      },
      (err) => {
        console.warn('Firestore leads snapshot error:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Subscribe to real-time visits from Firestore
 */
export function subscribeToVisits(onSuccess, onError) {
  try {
    const q = query(collection(db, COLLECTIONS.VISITS));
    return onSnapshot(
      q,
      (snapshot) => {
        const items = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() });
        });
        items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        onSuccess(items);
      },
      (err) => {
        console.warn('Firestore visits snapshot error:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Subscribe to real-time enquiries from Firestore
 */
export function subscribeToEnquiries(onSuccess, onError) {
  try {
    const q = query(collection(db, COLLECTIONS.ENQUIRIES));
    return onSnapshot(
      q,
      (snapshot) => {
        const items = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() });
        });
        items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        onSuccess(items);
      },
      (err) => {
        console.warn('Firestore enquiries snapshot error:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Subscribe to settings from Firestore
 */
export function subscribeToSettings(onSuccess, onError) {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'general');
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          onSuccess(docSnap.data());
        }
      },
      (err) => {
        console.warn('Firestore settings snapshot error:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Save / Update a Property in Firestore
 */
export async function savePropertyToFirestore(property) {
  try {
    const id = String(property.id || `prop-${Date.now()}`);
    const docRef = doc(db, COLLECTIONS.PROPERTIES, id);
    const dataToSave = {
      ...property,
      id,
      updatedAt: new Date().toISOString()
    };
    await setDoc(docRef, dataToSave, { merge: true });
    return { success: true, id };
  } catch (err) {
    console.error('Error saving property to Firestore:', err);
    return { success: false, error: err };
  }
}

/**
 * Delete a Property from Firestore
 */
export async function deletePropertyFromFirestore(id) {
  try {
    const docRef = doc(db, COLLECTIONS.PROPERTIES, String(id));
    await deleteDoc(docRef);
    return { success: true };
  } catch (err) {
    console.error('Error deleting property from Firestore:', err);
    return { success: false, error: err };
  }
}

/**
 * Save a new Lead to Firestore
 */
export async function saveLeadToFirestore(lead) {
  try {
    const id = String(lead.id || `lead-${Date.now()}`);
    const docRef = doc(db, COLLECTIONS.LEADS, id);
    const dataToSave = {
      ...lead,
      id,
      status: lead.status || 'New',
      createdAt: lead.createdAt || new Date().toISOString()
    };
    await setDoc(docRef, dataToSave, { merge: true });
    return { success: true, id };
  } catch (err) {
    console.error('Error saving lead to Firestore:', err);
    return { success: false, error: err };
  }
}

/**
 * Update Lead Status in Firestore
 */
export async function updateLeadStatusInFirestore(id, status) {
  try {
    const docRef = doc(db, COLLECTIONS.LEADS, String(id));
    await updateDoc(docRef, { status, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (err) {
    console.error('Error updating lead status in Firestore:', err);
    return { success: false, error: err };
  }
}

/**
 * Delete a Lead from Firestore
 */
export async function deleteLeadFromFirestore(id) {
  try {
    const docRef = doc(db, COLLECTIONS.LEADS, String(id));
    await deleteDoc(docRef);
    return { success: true };
  } catch (err) {
    console.error('Error deleting lead from Firestore:', err);
    return { success: false, error: err };
  }
}

/**
 * Save a Visit Booking to Firestore
 */
export async function saveVisitToFirestore(visit) {
  try {
    const id = String(visit.id || `visit-${Date.now()}`);
    const docRef = doc(db, COLLECTIONS.VISITS, id);
    const dataToSave = {
      ...visit,
      id,
      status: visit.status || 'Pending',
      createdAt: visit.createdAt || new Date().toISOString()
    };
    await setDoc(docRef, dataToSave, { merge: true });
    return { success: true, id };
  } catch (err) {
    console.error('Error saving visit to Firestore:', err);
    return { success: false, error: err };
  }
}

/**
 * Update Visit Status in Firestore
 */
export async function updateVisitStatusInFirestore(id, status) {
  try {
    const docRef = doc(db, COLLECTIONS.VISITS, String(id));
    await updateDoc(docRef, { status, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (err) {
    console.error('Error updating visit status in Firestore:', err);
    return { success: false, error: err };
  }
}

/**
 * Delete a Visit from Firestore
 */
export async function deleteVisitFromFirestore(id) {
  try {
    const docRef = doc(db, COLLECTIONS.VISITS, String(id));
    await deleteDoc(docRef);
    return { success: true };
  } catch (err) {
    console.error('Error deleting visit from Firestore:', err);
    return { success: false, error: err };
  }
}

/**
 * Save Enquiry to Firestore
 */
export async function saveEnquiryToFirestore(enquiry) {
  try {
    const id = String(enquiry.id || `enq-${Date.now()}`);
    const docRef = doc(db, COLLECTIONS.ENQUIRIES, id);
    const dataToSave = {
      ...enquiry,
      id,
      status: enquiry.status || 'Unread',
      createdAt: enquiry.createdAt || new Date().toISOString()
    };
    await setDoc(docRef, dataToSave, { merge: true });
    return { success: true, id };
  } catch (err) {
    console.error('Error saving enquiry to Firestore:', err);
    return { success: false, error: err };
  }
}

/**
 * Update Enquiry Status in Firestore
 */
export async function updateEnquiryStatusInFirestore(id, status) {
  try {
    const docRef = doc(db, COLLECTIONS.ENQUIRIES, String(id));
    await updateDoc(docRef, { status, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (err) {
    console.error('Error updating enquiry status in Firestore:', err);
    return { success: false, error: err };
  }
}

/**
 * Delete an Enquiry from Firestore
 */
export async function deleteEnquiryFromFirestore(id) {
  try {
    const docRef = doc(db, COLLECTIONS.ENQUIRIES, String(id));
    await deleteDoc(docRef);
    return { success: true };
  } catch (err) {
    console.error('Error deleting enquiry from Firestore:', err);
    return { success: false, error: err };
  }
}

/**
 * Save Settings to Firestore
 */
export async function saveSettingsToFirestore(settings) {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'general');
    await setDoc(docRef, { ...settings, updatedAt: new Date().toISOString() }, { merge: true });
    return { success: true };
  } catch (err) {
    console.error('Error saving settings to Firestore:', err);
    return { success: false, error: err };
  }
}

/**
 * Seeds initial database data if Firestore collections are empty
 */
export async function seedInitialFirestoreDataIfEmpty(initialProperties, initialSettings, initialLeads = [], initialVisits = [], initialEnquiries = []) {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.PROPERTIES));
    if (snap.empty && Array.isArray(initialProperties) && initialProperties.length > 0) {
      console.log('Seeding initial properties into Firestore...');
      const batch = writeBatch(db);

      // Seed properties
      initialProperties.forEach((prop) => {
        const id = String(prop.id);
        const ref = doc(db, COLLECTIONS.PROPERTIES, id);
        batch.set(ref, {
          ...prop,
          id,
          createdAt: prop.createdAt || new Date().toISOString()
        });
      });

      // Seed settings
      if (initialSettings) {
        const settingsRef = doc(db, COLLECTIONS.SETTINGS, 'general');
        batch.set(settingsRef, {
          ...initialSettings,
          updatedAt: new Date().toISOString()
        });
      }

      // Seed sample leads if empty
      initialLeads.forEach((lead) => {
        const ref = doc(db, COLLECTIONS.LEADS, String(lead.id));
        batch.set(ref, lead);
      });

      // Seed sample visits if empty
      initialVisits.forEach((visit) => {
        const ref = doc(db, COLLECTIONS.VISITS, String(visit.id));
        batch.set(ref, visit);
      });

      // Seed sample enquiries if empty
      initialEnquiries.forEach((enq) => {
        const ref = doc(db, COLLECTIONS.ENQUIRIES, String(enq.id));
        batch.set(ref, enq);
      });

      await batch.commit();
      console.log('Firestore successfully seeded with initial Shyam Homes data!');
      return { seeded: true };
    }
    return { seeded: false };
  } catch (err) {
    console.warn('Unable to seed Firestore (check security rules or connection):', err);
    return { seeded: false, error: err };
  }
}

/**
 * Force uploads all local properties, settings, leads, visits and enquiries to Firestore
 */
export async function forceUploadAllDataToFirestore(properties, settings, leads = [], visits = [], enquiries = []) {
  try {
    const batch = writeBatch(db);

    // 1. Properties
    if (Array.isArray(properties) && properties.length > 0) {
      properties.forEach((prop) => {
        const id = String(prop.id);
        const ref = doc(db, COLLECTIONS.PROPERTIES, id);
        batch.set(ref, {
          ...prop,
          id,
          createdAt: prop.createdAt || new Date().toISOString()
        }, { merge: true });
      });
    }

    // 2. Settings
    if (settings) {
      const settingsRef = doc(db, COLLECTIONS.SETTINGS, 'general');
      batch.set(settingsRef, {
        ...settings,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }

    // 3. Leads
    if (Array.isArray(leads) && leads.length > 0) {
      leads.forEach((lead) => {
        const ref = doc(db, COLLECTIONS.LEADS, String(lead.id));
        batch.set(ref, lead, { merge: true });
      });
    }

    // 4. Visits
    if (Array.isArray(visits) && visits.length > 0) {
      visits.forEach((visit) => {
        const ref = doc(db, COLLECTIONS.VISITS, String(visit.id));
        batch.set(ref, visit, { merge: true });
      });
    }

    // 5. Enquiries
    if (Array.isArray(enquiries) && enquiries.length > 0) {
      enquiries.forEach((enq) => {
        const ref = doc(db, COLLECTIONS.ENQUIRIES, String(enq.id));
        batch.set(ref, enq, { merge: true });
      });
    }

    await batch.commit();
    console.log('Successfully pushed all Shyam Homes records to Firestore!');
    return { success: true };
  } catch (err) {
    console.error('Error in forceUploadAllDataToFirestore:', err);
    throw err;
  }
}

