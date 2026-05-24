// Test script to register a doctor via API
const API_BASE_URL = 'https://das-backend-yj6r.onrender.com';

const doctorData = {
  "fullName": "Dr. John Doe",
  "email": "memonyasissn2007@gmail.com",
  "phone": "+12345767890",
  "password": "securepassword", 
  "specialty": "Cardiology",
  "experience": 10,
  "qualifications": ["MD"],
  "registration_number": "REG123422256",
  "hospital_name": "HealthCare Hospital",
  "city": "Health City",
  "consulation_type": "Online",
  "consulation_fee": 150,
  "available_days": ["Monday", "Wednesday", "Friday"],
  "time_slots": ["10:00-12:00", "14:00-16:00"],
  "conclusion_duration": 30,
  "medical_license": "MEDLIC123456",
  "goverment_id": "GOV123456",
  "government_id": "GOV123456"
};

async function registerDoctor() {
  try {
    console.log('📤 Sending request to:', `${API_BASE_URL}/api/doctor/register`);
    console.log('📦 Payload:', JSON.stringify(doctorData, null, 2));
    console.log('\n⏳ Waiting for response...\n');

    const fd = new FormData();
    Object.entries(doctorData).forEach(([k, v]) => {
      if (v === undefined) return;
      if (Array.isArray(v)) fd.append(k, JSON.stringify(v));
      else fd.append(k, String(v));
    });

    // include both spellings to support backend typo
    if (doctorData.government_id) {
      fd.append('government_id', doctorData.government_id);
      fd.append('goverment_id', doctorData.government_id);
    }

    const response = await fetch(`${API_BASE_URL}/api/doctor/register`, {
      method: 'POST',
      // let fetch set the proper multipart headers for FormData
      body: fd,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Registration failed!');
      console.error('Status:', response.status);
      console.error('Error:', data);
      return;
    }

    console.log('✅ Registration successful!');
    console.log('Response:', JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

// Run the test
registerDoctor();
