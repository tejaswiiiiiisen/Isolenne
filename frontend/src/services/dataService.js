import { supabase } from '../lib/supabaseClient';

const STORAGE_KEYS = {
  JOBS: 'skillorapath_admin_jobs_v5',
  APPLICATIONS: 'skillorapath_admin_applications_v6',
  CANDIDATES: 'skillorapath_admin_candidates_v5',
  EMPLOYEES: 'skillorapath_admin_employees_v5',
  INTERNS: 'skillorapath_admin_interns_v5',
  INTERVIEWS: 'skillorapath_admin_interviews_v5',
  ATTENDANCE: 'skillorapath_admin_attendance_v5',
  LEAVES: 'skillorapath_admin_leaves_v5',
  TASKS: 'skillorapath_admin_tasks_v5',
  FEEDBACK: 'skillorapath_admin_feedback_v5',
  LEADS: 'skillorapath_admin_leads_v5',
  FINANCE: 'skillorapath_finance_bills_v5',
  EVENTS: 'skillorapath_event_photos_v5',
  CERTIFICATES: 'skillorapath_admin_certificates_v5',
  BLACKLIST: 'skillorapath_blacklisted_emails_v5',
  NOTIFICATIONS: 'skillorapath_admin_notifications_v5',
  CUSTOM_ROLES: 'skillorapath_custom_roles_v5',
  CUSTOM_DEPTS: 'skillorapath_custom_departments_v5'
};

// Initial Jobs with Internship specifics
export const SEED_JOBS = [
  {
    id: "job-001",
    title: "Full Stack Developer Intern",
    department: "Engineering",
    salary: "₹15,000 - ₹25,000 / mo",
    employment_type: "Internship",
    duration: "3 Months",
    duration_months: 3,
    location: "Ajmer / Remote",
    experience: "Fresher / 0-1 yr",
    skills: "React, Node.js, TypeScript, PostgreSQL",
    openings: 3,
    deadline: "2026-12-15",
    description: "Build robust full-stack web applications, REST APIs, and modern responsive user interfaces.",
    requirements: "Strong JavaScript fundamentals, React experience, and eager learner.",
    benefits: "Mentorship by senior architects, PPO opportunity, hands-on production code.",
    status: "Active",
    created_at: "2026-06-10T10:00:00.000Z"
  },
  {
    id: "job-002",
    title: "Backend Developer Intern",
    department: "Engineering",
    salary: "₹15,000 - ₹22,000 / mo",
    employment_type: "Internship",
    duration: "6 Months",
    duration_months: 6,
    location: "Ajmer",
    experience: "Fresher / 0-1 yr",
    skills: "Node.js, Express, Supabase, Python",
    openings: 2,
    deadline: "2026-11-30",
    description: "Design efficient backend services, database schemas, and microservice integrations.",
    requirements: "Good understanding of databases, REST APIs, and cloud primitives.",
    benefits: "Certificate, stipend, performance bonus.",
    status: "Active",
    created_at: "2026-06-12T11:30:00.000Z"
  },
  {
    id: "job-003",
    title: "Frontend Developer Intern",
    department: "Engineering",
    salary: "₹12,000 - ₹18,000 / mo",
    employment_type: "Internship",
    duration: "3 Months",
    duration_months: 3,
    location: "Remote / Hybrid",
    experience: "Fresher",
    skills: "React 19, Tailwind CSS, Next.js, Framer Motion",
    openings: 2,
    deadline: "2026-12-10",
    description: "Create pixel-perfect responsive web designs and fluid interactive web applications.",
    requirements: "Eye for modern UI/UX design, clean component hierarchy.",
    benefits: "Flexible hours, portfolio projects, career mentorship.",
    status: "Active",
    created_at: "2026-06-18T14:20:00.000Z"
  },
  {
    id: "job-004",
    title: "AI & Machine Learning Intern",
    department: "Engineering",
    salary: "₹18,000 - ₹28,000 / mo",
    employment_type: "Internship",
    duration: "6 Months",
    duration_months: 6,
    location: "Ajmer",
    experience: "0-1 yr",
    skills: "Python, PyTorch, OpenAI API, LangChain, Vectors",
    openings: 2,
    deadline: "2026-12-05",
    description: "Develop agentic AI workflows, vector search pipelines, and LLM integrations.",
    requirements: "Experience with Python, data manipulation, and modern AI APIs.",
    benefits: "Fast-track PPO opportunity, real-world AI deployment experience.",
    status: "Active",
    created_at: "2026-06-20T08:15:00.000Z"
  },
  {
    id: "job-005",
    title: "UI/UX Design Intern",
    department: "Design",
    salary: "₹12,000 - ₹16,000 / mo",
    employment_type: "Internship",
    duration: "2 Months",
    duration_months: 2,
    location: "Remote",
    experience: "Fresher",
    skills: "Figma, Wireframing, Design Systems, Typography",
    openings: 1,
    deadline: "2026-12-20",
    description: "Design intuitive interfaces, interactive prototypes, and design system components.",
    requirements: "Figma portfolio required with at least 2 mobile or web case studies.",
    benefits: "Portfolio building with live production SaaS products.",
    status: "Active",
    created_at: "2026-06-25T11:00:00.000Z"
  }
];

// Candidates Database
export const SEED_CANDIDATES = [
  {
    id: "cand-101",
    candidate_id: "AGX-CND-101",
    name: "Raju Kumar",
    email: "raju.kumar@example.com",
    phone: "+91 98290 77112",
    college: "Govt Engineering College, Ajmer",
    qualification: "B.Tech Computer Science",
    current_year: "4th Year",
    skills: "React, Node.js, TypeScript, PostgreSQL",
    experience: "6 Months Project Experience",
    resume_url: "https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf",
    applied_for: "Full Stack Developer Intern",
    applied_date: "2026-11-03",
    status: "Shortlisted",
    hr_notes: "Strong project portfolio with full-stack live URL.",
    profile_picture: "/review/client_1.webp"
  },
  {
    id: "cand-102",
    candidate_id: "AGX-CND-102",
    name: "Shakir Ali",
    email: "shakir.ali@example.com",
    phone: "+91 97850 44332",
    college: "Rajasthan Technical University",
    qualification: "B.Tech IT",
    current_year: "Final Year",
    skills: "Node.js, Supabase, Express, Docker, CI/CD",
    experience: "Freelance Backend Developer",
    resume_url: "https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf",
    applied_for: "Backend Developer Intern",
    applied_date: "2026-11-02",
    status: "Interview Scheduled",
    hr_notes: "Qualified for technical round. Impressive backend architecture skills.",
    profile_picture: "/review/shakir-review.webp"
  },
  {
    id: "cand-103",
    candidate_id: "AGX-CND-103",
    name: "Manas Suryavanshi",
    email: "manas.survanshi@example.com",
    phone: "+91 98280 99887",
    college: "BITS Pilani",
    qualification: "B.E. Computer Science",
    current_year: "4th Year",
    skills: "Python, PyTorch, OpenAI API, LangChain",
    experience: "Fresher with 3 AI Research Papers",
    resume_url: "https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf",
    applied_for: "AI & Machine Learning Intern",
    applied_date: "2026-10-28",
    status: "Selected",
    hr_notes: "Selected unanimously in technical round. Offer letter generated.",
    profile_picture: "/review/manas-review.webp"
  },
  {
    id: "cand-104",
    candidate_id: "AGX-CND-104",
    name: "Ananya Sharma",
    email: "ananya.sharma@example.com",
    phone: "+91 98234 56789",
    college: "Sophia Girls College, Ajmer",
    qualification: "BCA",
    current_year: "3rd Year",
    skills: "React, Tailwind CSS, JavaScript",
    experience: "Fresher",
    resume_url: "https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf",
    applied_for: "Frontend Developer Intern",
    applied_date: "2026-11-01",
    status: "Under Review",
    hr_notes: "Screening task submitted. Awaiting mentor feedback.",
    profile_picture: "/review/client_3.webp"
  },
  {
    id: "cand-105",
    candidate_id: "AGX-CND-105",
    name: "Vikram Rathore",
    email: "vikram.rathore@example.com",
    phone: "+91 97112 33445",
    college: "MLV Textile & Engg College",
    qualification: "B.Tech CS",
    current_year: "4th Year",
    skills: "Figma, Adobe XD, CSS",
    experience: "Freelance UI Projects",
    resume_url: "",
    applied_for: "UI/UX Design Intern",
    applied_date: "2026-10-25",
    status: "Offer Accepted",
    hr_notes: "Offer accepted. Joining on 15th Nov.",
    profile_picture: "/review/client_2.webp"
  }
];

// Applications Pipeline (4 Clean Stages: Applied, Shortlisted, Interview, Selected)
export const SEED_APPLICATIONS = [
  {
    id: "app-201",
    candidate_id: "cand-101",
    candidate_name: "Raju Kumar",
    email: "raju.kumar@example.com",
    phone: "+91 98290 77112",
    job_id: "job-001",
    job_title: "Full Stack Developer Intern",
    department: "Engineering",
    applied_date: "2026-11-03",
    status: "Shortlisted",
    hr_remarks: "Ready for Technical Round with Lead Architect.",
    college: "Govt Engineering College, Ajmer",
    qualification: "B.Tech Computer Science",
    skills: "React, Node.js, TypeScript, PostgreSQL",
    resume_url: "https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf"
  },
  {
    id: "app-204",
    candidate_id: "cand-104",
    candidate_name: "Ananya Sharma",
    email: "ananya.sharma@example.com",
    phone: "+91 98234 56789",
    job_id: "job-003",
    job_title: "Frontend Developer Intern",
    department: "Engineering",
    applied_date: "2026-11-01",
    status: "Shortlisted",
    hr_remarks: "GitHub repo reviewed. Good React component knowledge.",
    college: "Sophia Girls College, Ajmer",
    qualification: "BCA",
    skills: "React, Tailwind CSS, JavaScript",
    resume_url: "https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf"
  },
  {
    id: "app-202",
    candidate_id: "cand-102",
    candidate_name: "Shakir Ali",
    email: "shakir.ali@example.com",
    phone: "+91 97850 44332",
    job_id: "job-002",
    job_title: "Backend Developer Intern",
    department: "Engineering",
    applied_date: "2026-11-02",
    status: "Interview",
    hr_remarks: "Technical Round 1 scheduled for 06 Nov, 3:00 PM.",
    college: "Rajasthan Technical University",
    qualification: "B.Tech IT",
    skills: "Node.js, Express, Docker, PostgreSQL",
    resume_url: "https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf"
  },
  {
    id: "app-203",
    candidate_id: "cand-103",
    candidate_name: "Manas Suryavanshi",
    email: "manas.survanshi@example.com",
    phone: "+91 98280 99887",
    job_id: "job-004",
    job_title: "AI & Machine Learning Intern",
    department: "Engineering",
    applied_date: "2026-10-28",
    status: "Selected",
    hr_remarks: "Selected unanimously in technical round. Offer letter generated.",
    college: "BITS Pilani",
    qualification: "B.E. Computer Science",
    skills: "Python, PyTorch, OpenAI API, LangChain",
    resume_url: "https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf"
  }
];

// Interview Management
export const SEED_INTERVIEWS = [
  {
    id: "int-301",
    candidate_id: "cand-102",
    candidate_name: "Shakir Ali",
    role: "Backend Developer Intern",
    round: "Technical Round 1 (System & DB)",
    interviewer: "Raju Kumar (Lead Architect)",
    date: "2026-11-06",
    time: "03:00 PM",
    mode: "Online (Google Meet)",
    meeting_link: "https://meet.google.com/agx-tech-interview",
    status: "Scheduled",
    rating: 0,
    feedback: "",
    result: "Pending"
  },
  {
    id: "int-302",
    candidate_id: "cand-101",
    candidate_name: "Raju Kumar",
    role: "Full Stack Developer Intern",
    round: "HR & Culture Fit",
    interviewer: "Pooja Rathore (HR Lead)",
    date: "2026-11-07",
    time: "11:30 AM",
    mode: "Online (Google Meet)",
    meeting_link: "https://meet.google.com/agx-hr-interview",
    status: "Scheduled",
    rating: 0,
    feedback: "",
    result: "Pending"
  },
  {
    id: "int-303",
    candidate_id: "cand-103",
    candidate_name: "Manas Suryavanshi",
    role: "AI & Machine Learning Intern",
    round: "Architecture & System Design",
    interviewer: "Tejaswi Sen (Founder & CEO)",
    date: "2026-10-30",
    time: "04:00 PM",
    mode: "Offline (Ajmer HQ)",
    meeting_link: "Board Room A",
    status: "Completed",
    rating: 5,
    feedback: "Exceptional mastery over LLM agents and database indexing.",
    result: "Selected"
  }
];

// SELECTED INTERNS & DURATION PROGRESS TRACKER (The Core Feature!)
export const SEED_INTERNS = [
  {
    id: "intern-001",
    intern_id: "INT-2026-001",
    candidate_id: "cand-103",
    name: "Manas Suryavanshi",
    role: "AI & Machine Learning Intern",
    department: "Engineering",
    college: "BITS Pilani",
    joining_date: "2026-08-01",
    duration_months: 3,
    start_date: "2026-08-01",
    end_date: "2026-10-31",
    extended_end_date: "2026-12-31",
    extension_reason: "Promoted to 5-month Advanced Research Cohort",
    mentor: "Tejaswi Sen",
    stipend: "₹20,000 / mo",
    status: "Active",
    attendance_pct: 96,
    performance_rating: 4.9,
    certificate_status: "Pending",
    offer_status: "Accepted",
    profile_picture: "/review/manas-review.webp"
  },
  {
    id: "intern-002",
    intern_id: "INT-2026-002",
    candidate_id: "cand-101",
    name: "Raju Kumar",
    role: "Full Stack Developer Intern",
    department: "Engineering",
    college: "Govt Engineering College, Ajmer",
    joining_date: "2026-09-01",
    duration_months: 3,
    start_date: "2026-09-01",
    end_date: "2026-11-30",
    extended_end_date: "",
    extension_reason: "",
    mentor: "Shakir Ali",
    stipend: "₹18,000 / mo",
    status: "Near Completion",
    attendance_pct: 92,
    performance_rating: 4.6,
    certificate_status: "Eligible",
    offer_status: "Accepted",
    profile_picture: "/review/client_1.webp"
  },
  {
    id: "intern-003",
    intern_id: "INT-2026-003",
    candidate_id: "cand-102",
    name: "Shakir Ali",
    role: "Cloud DevOps Intern",
    department: "Engineering",
    college: "Rajasthan Technical University",
    joining_date: "2026-05-01",
    duration_months: 6,
    start_date: "2026-05-01",
    end_date: "2026-10-31",
    extended_end_date: "",
    extension_reason: "",
    mentor: "Tejaswi Sen",
    stipend: "₹22,000 / mo",
    status: "Overdue",
    attendance_pct: 95,
    performance_rating: 4.8,
    certificate_status: "Eligible",
    offer_status: "Accepted",
    profile_picture: "/review/shakir-review.webp"
  },
  {
    id: "intern-004",
    intern_id: "INT-2026-004",
    candidate_id: "cand-105",
    name: "Vikram Rathore",
    role: "UI/UX Product Design Intern",
    department: "Design",
    college: "MLV Textile & Engg College",
    joining_date: "2026-06-01",
    duration_months: 3,
    start_date: "2026-06-01",
    end_date: "2026-08-31",
    extended_end_date: "",
    extension_reason: "",
    mentor: "Kavita Meena",
    stipend: "₹15,000 / mo",
    status: "Completed",
    attendance_pct: 98,
    performance_rating: 5.0,
    certificate_status: "Issued",
    offer_status: "Accepted",
    profile_picture: "/review/client_2.webp"
  },
  {
    id: "intern-005",
    intern_id: "INT-2026-005",
    candidate_id: "cand-104",
    name: "Ananya Sharma",
    role: "Frontend Development Intern",
    department: "Engineering",
    college: "Sophia Girls College, Ajmer",
    joining_date: "2026-11-15",
    duration_months: 3,
    start_date: "2026-11-15",
    end_date: "2027-02-15",
    extended_end_date: "",
    extension_reason: "",
    mentor: "Raju Kumar",
    stipend: "₹15,000 / mo",
    status: "Not Started",
    attendance_pct: 100,
    performance_rating: 0,
    certificate_status: "Pending",
    offer_status: "Sent",
    profile_picture: "/review/client_3.webp"
  }
];

// EMPLOYEES & CORE TEAM DIRECTORY (With Raju, Shakir, Manas, Tejaswi, Shashank, Aman, Pooja, Kavita)
export const SEED_EMPLOYEES = [
  {
    id: "emp-001",
    registration_no: "AGX-EMP-001",
    name: "Tejaswi Sen",
    father_name: "R. C. Sen",
    dob: "1997-08-14",
    email: "tejaswi@skillorapath.com",
    contact_number: "+91 98290 12345",
    role: "Founder & CEO",
    department: "Executive",
    start_date: "2024-01-01",
    end_date: "",
    salary: "₹1,50,000",
    aadhaar_no: "4321-8765-9012",
    permanent_address: "Civil Lines, Ajmer, Rajasthan",
    current_address: "Civil Lines, Ajmer, Rajasthan",
    account_no: "987654321012",
    ifsc_detail: "HDFC0001234",
    status: "Active",
    profile_picture: "/Team/tejaswi_sen.webp"
  },
  {
    id: "emp-002",
    registration_no: "AGX-EMP-002",
    name: "Shashank Shubham",
    father_name: "K. P. Shubham",
    dob: "1998-03-22",
    email: "shashank@skillorapath.com",
    contact_number: "+91 98290 54321",
    role: "Co-Founder & COO",
    department: "Executive",
    start_date: "2024-01-01",
    end_date: "",
    salary: "₹1,40,000",
    aadhaar_no: "4321-8765-9013",
    permanent_address: "Vaishali Nagar, Ajmer, Rajasthan",
    current_address: "Vaishali Nagar, Ajmer, Rajasthan",
    account_no: "987654321013",
    ifsc_detail: "HDFC0001234",
    status: "Active",
    profile_picture: "/Team/shashank_shubham.webp"
  },
  {
    id: "emp-003",
    registration_no: "AGX-EMP-003",
    name: "Raju Kumar",
    father_name: "Mahesh Kumar",
    dob: "1999-11-05",
    email: "raju.kumar@skillorapath.com",
    contact_number: "+91 98290 77112",
    role: "Lead Full Stack Architect",
    department: "Engineering",
    start_date: "2024-03-01",
    end_date: "",
    salary: "₹85,000",
    aadhaar_no: "4321-8765-9014",
    permanent_address: "Panchsheel Colony, Ajmer, Rajasthan",
    current_address: "Panchsheel Colony, Ajmer, Rajasthan",
    account_no: "987654321014",
    ifsc_detail: "SBIN0004567",
    status: "Active",
    profile_picture: "/review/client_1.webp"
  },
  {
    id: "emp-004",
    registration_no: "AGX-EMP-004",
    name: "Shakir Ali",
    father_name: "Hassan Ali",
    dob: "1998-07-19",
    email: "shakir.ali@skillorapath.com",
    contact_number: "+91 97850 44332",
    role: "Lead Cloud & DevOps Engineer",
    department: "Engineering",
    start_date: "2024-04-15",
    end_date: "",
    salary: "₹80,000",
    aadhaar_no: "4321-8765-9015",
    permanent_address: "Dargah Bazar, Ajmer, Rajasthan",
    current_address: "Dargah Bazar, Ajmer, Rajasthan",
    account_no: "987654321015",
    ifsc_detail: "ICIC0002345",
    status: "Active",
    profile_picture: "/review/shakir-review.webp"
  },
  {
    id: "emp-005",
    registration_no: "AGX-EMP-005",
    name: "Manas Suryavanshi",
    father_name: "Virendra Suryavanshi",
    dob: "2000-01-28",
    email: "manas@skillorapath.com",
    contact_number: "+91 98280 99887",
    role: "Senior AI & ML Engineer",
    department: "Engineering",
    start_date: "2024-05-01",
    end_date: "",
    salary: "₹75,000",
    aadhaar_no: "4321-8765-9016",
    permanent_address: "Kotra, Ajmer, Rajasthan",
    current_address: "Kotra, Ajmer, Rajasthan",
    account_no: "987654321016",
    ifsc_detail: "KKBK0001234",
    status: "Active",
    profile_picture: "/review/manas-review.webp"
  },
  {
    id: "emp-006",
    registration_no: "AGX-EMP-006",
    name: "Aman Verma",
    father_name: "Surendra Verma",
    dob: "1999-09-12",
    email: "aman.verma@skillorapath.com",
    contact_number: "+91 98210 11223",
    role: "Frontend Systems Engineer",
    department: "Engineering",
    start_date: "2024-06-15",
    end_date: "",
    salary: "₹60,000",
    aadhaar_no: "4321-8765-9017",
    permanent_address: "Makhupura, Ajmer, Rajasthan",
    current_address: "Makhupura, Ajmer, Rajasthan",
    account_no: "987654321017",
    ifsc_detail: "PUNB0005678",
    status: "Active",
    profile_picture: "/review/client_2.webp"
  },
  {
    id: "emp-007",
    registration_no: "AGX-EMP-007",
    name: "Pooja Rathore",
    father_name: "Govind Rathore",
    dob: "1998-12-04",
    email: "pooja.rathore@skillorapath.com",
    contact_number: "+91 98234 88776",
    role: "Lead HR & Talent Manager",
    department: "Human Resources",
    start_date: "2024-04-01",
    end_date: "",
    salary: "₹55,000",
    aadhaar_no: "4321-8765-9018",
    permanent_address: "Adarsh Nagar, Ajmer, Rajasthan",
    current_address: "Adarsh Nagar, Ajmer, Rajasthan",
    account_no: "987654321018",
    ifsc_detail: "BARB0AJMXXX",
    status: "Active",
    profile_picture: "/review/client_3.webp"
  },
  {
    id: "emp-008",
    registration_no: "AGX-EMP-008",
    name: "Kavita Meena",
    father_name: "Ramswaroop Meena",
    dob: "2000-04-18",
    email: "kavita.meena@skillorapath.com",
    contact_number: "+91 98255 66778",
    role: "Lead UI/UX Product Designer",
    department: "Design",
    start_date: "2024-07-01",
    end_date: "",
    salary: "₹65,000",
    aadhaar_no: "4321-8765-9019",
    permanent_address: "Ganj, Ajmer, Rajasthan",
    current_address: "Ganj, Ajmer, Rajasthan",
    account_no: "987654321019",
    ifsc_detail: "HDFC0001234",
    status: "Active",
    profile_picture: "/review/client_4.webp"
  }
];

// Attendance & Performance
export const SEED_ATTENDANCE = [
  {
    id: "att-001",
    intern_id: "intern-001",
    name: "Manas Suryavanshi",
    role: "AI & Machine Learning Intern",
    total_working_days: 68,
    present_days: 65,
    absent_days: 2,
    leave_days: 1,
    late_checkins: 1,
    monthly_pct: 96,
    performance_rating: 4.9
  },
  {
    id: "att-002",
    intern_id: "intern-002",
    name: "Raju Kumar",
    role: "Full Stack Developer Intern",
    total_working_days: 48,
    present_days: 44,
    absent_days: 2,
    leave_days: 2,
    late_checkins: 3,
    monthly_pct: 92,
    performance_rating: 4.6
  },
  {
    id: "att-003",
    intern_id: "intern-003",
    name: "Shakir Ali",
    role: "Cloud DevOps Intern",
    total_working_days: 125,
    present_days: 119,
    absent_days: 4,
    leave_days: 2,
    late_checkins: 0,
    monthly_pct: 95,
    performance_rating: 4.8
  },
  {
    id: "att-004",
    intern_id: "intern-004",
    name: "Vikram Rathore",
    role: "UI/UX Product Design Intern",
    total_working_days: 64,
    present_days: 63,
    absent_days: 1,
    leave_days: 0,
    late_checkins: 0,
    monthly_pct: 98,
    performance_rating: 5.0
  }
];

// Leave Requests
export const SEED_LEAVES = [
  {
    id: "leave-001",
    intern_name: "Raju Kumar",
    leave_type: "Exam Leave",
    start_date: "2026-11-10",
    end_date: "2026-11-12",
    days: 3,
    reason: "Semester final practical examinations at college.",
    status: "Pending"
  },
  {
    id: "leave-002",
    intern_name: "Manas Suryavanshi",
    leave_type: "Personal Leave",
    start_date: "2026-10-18",
    end_date: "2026-10-19",
    days: 1,
    reason: "Family function in hometown.",
    status: "Approved"
  },
  {
    id: "leave-003",
    intern_name: "Shakir Ali",
    leave_type: "Sick Leave",
    start_date: "2026-10-04",
    end_date: "2026-10-05",
    days: 2,
    reason: "Viral fever recovery.",
    status: "Approved"
  }
];

// Tasks & Assignments
export const SEED_TASKS = [
  {
    id: "task-001",
    intern_name: "Manas Suryavanshi",
    title: "Implement Supabase Realtime Channel Sync",
    description: "Write WebSocket subscription listener for immediate live updates without manual page reload.",
    assigned_date: "2026-11-01",
    deadline: "2026-11-06",
    priority: "High",
    mentor: "Tejaswi Sen",
    status: "In Progress",
    submission_link: "https://github.com/skillorapath/realtime-pr-42",
    mentor_review: "Good code structure. Ensure memory leak cleanup on unmount."
  },
  {
    id: "task-002",
    intern_name: "Raju Kumar",
    title: "Build Responsive Candidate Profile Drawer",
    description: "Create slide-over drawer with recruiter notes input and stage selector buttons.",
    assigned_date: "2026-11-02",
    deadline: "2026-11-05",
    priority: "High",
    mentor: "Shakir Ali",
    status: "Completed",
    submission_link: "https://github.com/skillorapath/drawer-pr-19",
    mentor_review: "Excellent UI polish and seamless mobile responsiveness."
  },
  {
    id: "task-003",
    intern_name: "Shakir Ali",
    title: "Configure Docker Multi-Stage Build & CDN Caching",
    description: "Reduce final image footprint under 150MB and configure Brotli/Gzip edge caching headers.",
    assigned_date: "2026-10-25",
    deadline: "2026-10-30",
    priority: "Medium",
    mentor: "Tejaswi Sen",
    status: "Completed",
    submission_link: "https://github.com/skillorapath/infra-build",
    mentor_review: "Production image size decreased by 65%. Approved."
  }
];

// Certificates
export const SEED_CERTIFICATES = [
  {
    id: "cert_1782277558325",
    certification_number: "MAC/CET/2025/01",
    name: "Vikram Rathore",
    role: "UI/UX Product Design Intern",
    company_name: "SkilloraPath Technologies Pvt Ltd",
    start_date: "2026-06-01",
    end_date: "2026-08-31",
    total_duration: "3 Months",
    issue_date: "2026-09-02",
    url: "https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf",
    verification_id: "MAC/CET/2025/01",
    status: "Issued"
  },
  {
    id: "cert_1782277558326",
    certification_number: "MAC/CET/2025/02",
    name: "Shakir Ali",
    role: "Cloud DevOps Intern",
    company_name: "SkilloraPath Technologies Pvt Ltd",
    start_date: "2026-05-01",
    end_date: "2026-10-31",
    total_duration: "6 Months",
    issue_date: "2026-11-01",
    url: "https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf",
    verification_id: "MAC/CET/2025/02",
    status: "Generated"
  }
];

// Feedback & Evaluation
export const SEED_FEEDBACK = [
  {
    id: "feed-001",
    intern_name: "Vikram Rathore",
    mentor_name: "Kavita Meena",
    role: "UI/UX Product Design Intern",
    technical_skills: 5,
    communication: 5,
    teamwork: 4.8,
    punctuality: 5,
    overall_rating: 4.9,
    mentor_feedback: "Outstanding design sense. Produced complete Figma design tokens for the design system.",
    intern_feedback: "Great learning experience working directly with senior product designers and founders."
  },
  {
    id: "feed-002",
    intern_name: "Manas Suryavanshi",
    mentor_name: "Tejaswi Sen",
    role: "AI & Machine Learning Intern",
    technical_skills: 5,
    communication: 4.8,
    teamwork: 4.9,
    punctuality: 4.9,
    overall_rating: 4.9,
    mentor_feedback: "Brilliant grasp over generative AI pipelines and vector search optimization.",
    intern_feedback: "Empowering mentorship and clear vision from company founders."
  }
];

// Leads & Enquiries
export const SEED_LEADS = [
  {
    id: "lead-001",
    name: "Vikram Malhotra",
    email: "vikram@malhotratech.com",
    phone: "+91 98111 22334",
    company: "Malhotra Tech Solutions",
    subject: "Custom ERP & Intern Management",
    project_type: "AI Software Development",
    budget: "$10k - $25k",
    details: "Need custom multi-tenant CRM with automatic WhatsApp and email workflows for 50 agents.",
    source: "Website Contact Form",
    assigned_admin: "Tejaswi Sen",
    status: "New",
    created_at: "2026-11-04T09:20:00.000Z"
  },
  {
    id: "lead-002",
    name: "Sarah Jenkins",
    email: "sarah@apexglobal.co",
    phone: "+1 (415) 890-2134",
    company: "Apex Global Logistics",
    subject: "Document OCR Extraction",
    project_type: "Automation Solutions",
    budget: "$25k - $50k",
    details: "Looking to replace manual invoice data extraction using custom OCR and LLM automation pipeline.",
    source: "Referral",
    assigned_admin: "Shashank Shubham",
    status: "In Discussion",
    created_at: "2026-11-03T18:40:00.000Z"
  }
];

// Bills & Finance
export const SEED_BILLS = [
  {
    id: "bill-001",
    bill_no: "AGX-EXP-2026-101",
    vendor: "AWS Cloud Infrastructure",
    category: "Cloud Hosting",
    amount: "₹24,500",
    date: "2026-11-01",
    payment_mode: "Corporate Card",
    status: "Paid",
    receipt_url: "https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf",
    notes: "EC2 & RDS monthly production workload."
  },
  {
    id: "bill-002",
    bill_no: "AGX-EXP-2026-102",
    vendor: "OpenAI API Usage",
    category: "AI Inference",
    amount: "₹18,200",
    date: "2026-11-02",
    payment_mode: "Credit Card",
    status: "Paid",
    receipt_url: "",
    notes: "LLM token usage for client intelligence agents."
  },
  {
    id: "bill-003",
    bill_no: "AGX-EXP-2026-103",
    vendor: "Ajmer Innovation Hub Lease",
    category: "Office Rent",
    amount: "₹45,000",
    date: "2026-11-01",
    payment_mode: "Bank Transfer (NEFT)",
    status: "Paid",
    receipt_url: "",
    notes: "Ajmer corporate office floor rent."
  }
];

// Events & Media
export const SEED_EVENTS = [
  {
    id: "evt-001",
    title: "SkilloraPath Winter Internship Orientation 2026",
    date: "2026-11-15",
    location: "SkilloraPath Auditorium / Zoom Live",
    description: "Welcoming 25 new developers, cloud engineers, and designers to the winter cohort.",
    image: "/skillorapath-ad.webp",
    published: true
  },
  {
    id: "evt-002",
    title: "Annual Tech Hackathon & Demo Day",
    date: "2026-10-15",
    location: "Ajmer Innovation Hub",
    description: "48-hour internal AI agent build sprint with live product demos.",
    image: "/review/founder.webp",
    published: true
  }
];

function getLocal(key, defaultVal) {
  try {
    let raw = localStorage.getItem(key);
    if (!raw && key.startsWith('skillorapath_')) { raw = localStorage.getItem(key.replace('skillorapath_', 'agnix_')); }
    return raw ? JSON.parse(raw) : defaultVal;
  } catch (err) {
    return defaultVal;
  }
}

function setLocal(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {}
}

export const DataService = {
  // JOBS
  async getJobs() {
    try {
      const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setLocal(STORAGE_KEYS.JOBS, data);
        return data;
      }
    } catch (e) {}
    const cached = getLocal(STORAGE_KEYS.JOBS, null);
    if (cached && cached.length > 0) return cached;
    setLocal(STORAGE_KEYS.JOBS, SEED_JOBS);
    return SEED_JOBS;
  },

  async saveJob(jobData) {
    const saved = { ...jobData };
    if (!saved.id) saved.id = 'job_' + Date.now();
    try {
      await supabase.from('jobs').upsert(saved);
    } catch (e) {}
    const current = await this.getJobs();
    const idx = current.findIndex(j => j.id === saved.id);
    const updated = idx >= 0 ? current.map(j => j.id === saved.id ? saved : j) : [saved, ...current];
    setLocal(STORAGE_KEYS.JOBS, updated);
    return saved;
  },

  async deleteJob(jobId) {
    try { await supabase.from('jobs').delete().eq('id', jobId); } catch (e) {}
    const current = await this.getJobs();
    const updated = current.filter(j => j.id !== jobId);
    setLocal(STORAGE_KEYS.JOBS, updated);
    return updated;
  },

  // CANDIDATES
  async getCandidates() {
    const cached = getLocal(STORAGE_KEYS.CANDIDATES, null);
    if (cached && cached.length > 0) return cached;
    setLocal(STORAGE_KEYS.CANDIDATES, SEED_CANDIDATES);
    return SEED_CANDIDATES;
  },

  async saveCandidate(cand) {
    const saved = { ...cand };
    if (!saved.id) saved.id = 'cand_' + Date.now();
    const current = await this.getCandidates();
    const idx = current.findIndex(c => c.id === saved.id);
    const updated = idx >= 0 ? current.map(c => c.id === saved.id ? saved : c) : [saved, ...current];
    setLocal(STORAGE_KEYS.CANDIDATES, updated);
    return saved;
  },

  // APPLICATIONS
  async getApplications() {
    try {
      const { data, error } = await supabase.from('applications').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setLocal(STORAGE_KEYS.APPLICATIONS, data);
        return data;
      }
    } catch (e) {}
    const cached = getLocal(STORAGE_KEYS.APPLICATIONS, null);
    if (cached && cached.length > 0) return cached;
    setLocal(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS);
    return SEED_APPLICATIONS;
  },

  async updateApplicationStatus(appId, status) {
    try { await supabase.from('applications').update({ status }).eq('id', appId); } catch (e) {}
    const current = await this.getApplications();
    const updated = current.map(a => a.id === appId ? { ...a, status } : a);
    setLocal(STORAGE_KEYS.APPLICATIONS, updated);
    return updated;
  },

  async saveApplication(appData) {
    const saved = { ...appData };
    if (!saved.id) saved.id = 'app_' + Date.now();
    const current = await this.getApplications();
    const idx = current.findIndex(a => a.id === saved.id);
    const updated = idx >= 0 ? current.map(a => a.id === saved.id ? saved : a) : [saved, ...current];
    setLocal(STORAGE_KEYS.APPLICATIONS, updated);
    return saved;
  },

  // EMPLOYEES
  async getEmployees() {
    const cached = getLocal(STORAGE_KEYS.EMPLOYEES, null);
    if (cached && cached.length > 0) return cached;
    setLocal(STORAGE_KEYS.EMPLOYEES, SEED_EMPLOYEES);
    return SEED_EMPLOYEES;
  },

  async saveEmployee(emp) {
    const saved = { ...emp };
    if (!saved.id) saved.id = 'emp_' + Date.now();
    if (!saved.registration_no) {
      saved.registration_no = `AGX-EMP-00${Math.floor(10 + Math.random() * 90)}`;
    }
    const current = await this.getEmployees();
    const idx = current.findIndex(e => e.id === saved.id);
    const updated = idx >= 0 ? current.map(e => e.id === saved.id ? saved : e) : [saved, ...current];
    setLocal(STORAGE_KEYS.EMPLOYEES, updated);
    return saved;
  },

  async deleteEmployee(empId) {
    const current = await this.getEmployees();
    const updated = current.filter(e => e.id !== empId);
    setLocal(STORAGE_KEYS.EMPLOYEES, updated);
    return updated;
  },

  // INTERNS & TIMELINE TRACKER
  async getInterns() {
    const cached = getLocal(STORAGE_KEYS.INTERNS, null);
    if (cached && cached.length > 0) return cached;
    setLocal(STORAGE_KEYS.INTERNS, SEED_INTERNS);
    return SEED_INTERNS;
  },

  async saveIntern(intern) {
    const saved = { ...intern };
    if (!saved.id) saved.id = 'intern_' + Date.now();
    const current = await this.getInterns();
    const idx = current.findIndex(i => i.id === saved.id);
    const updated = idx >= 0 ? current.map(i => i.id === saved.id ? saved : i) : [saved, ...current];
    setLocal(STORAGE_KEYS.INTERNS, updated);
    return saved;
  },

  // Calculate dynamic progress & duration metrics for an intern
  calculateProgress(intern) {
    const today = new Date();
    const start = new Date(intern.start_date || intern.joining_date);
    const end = new Date(intern.extended_end_date || intern.end_date);

    const totalTime = end.getTime() - start.getTime();
    const elapsed = today.getTime() - start.getTime();

    // Days completed and remaining
    const totalDays = Math.max(1, Math.ceil(totalTime / (1000 * 60 * 60 * 24)));
    const daysCompleted = Math.max(0, Math.ceil(elapsed / (1000 * 60 * 60 * 24)));
    const daysRemaining = Math.max(0, Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    let progressPct = Math.min(100, Math.max(0, Math.round((daysCompleted / totalDays) * 100)));
    let status = intern.status || 'Active';

    if (today < start) {
      status = 'Not Started';
      progressPct = 0;
    } else if (today > end && status !== 'Completed') {
      status = 'Overdue';
      progressPct = 100;
    } else if (daysRemaining <= 15 && daysRemaining > 0 && status === 'Active') {
      status = 'Near Completion';
    }

    // Format months and days
    const completedMonths = Math.floor(daysCompleted / 30);
    const remainingMonths = Math.floor(daysRemaining / 30);

    return {
      totalDays,
      daysCompleted,
      daysRemaining,
      progressPct,
      computedStatus: status,
      completedStr: completedMonths > 0 ? `${completedMonths} mos ${daysCompleted % 30} days` : `${daysCompleted} days`,
      remainingStr: remainingMonths > 0 ? `${remainingMonths} mos ${daysRemaining % 30} days` : `${daysRemaining} days`
    };
  },

  // INTERVIEWS
  async getInterviews() {
    const cached = getLocal(STORAGE_KEYS.INTERVIEWS, null);
    if (cached && cached.length > 0) return cached;
    setLocal(STORAGE_KEYS.INTERVIEWS, SEED_INTERVIEWS);
    return SEED_INTERVIEWS;
  },

  async saveInterview(interview) {
    const saved = { ...interview };
    if (!saved.id) saved.id = 'int_' + Date.now();
    const current = await this.getInterviews();
    const idx = current.findIndex(i => i.id === saved.id);
    const updated = idx >= 0 ? current.map(i => i.id === saved.id ? saved : i) : [saved, ...current];
    setLocal(STORAGE_KEYS.INTERVIEWS, updated);
    return saved;
  },

  // ATTENDANCE
  async getAttendance() {
    const cached = getLocal(STORAGE_KEYS.ATTENDANCE, null);
    if (cached && cached.length > 0) return cached;
    setLocal(STORAGE_KEYS.ATTENDANCE, SEED_ATTENDANCE);
    return SEED_ATTENDANCE;
  },

  // LEAVES
  async getLeaves() {
    const cached = getLocal(STORAGE_KEYS.LEAVES, null);
    if (cached && cached.length > 0) return cached;
    setLocal(STORAGE_KEYS.LEAVES, SEED_LEAVES);
    return SEED_LEAVES;
  },

  async updateLeaveStatus(leaveId, status) {
    const current = await this.getLeaves();
    const updated = current.map(l => l.id === leaveId ? { ...l, status } : l);
    setLocal(STORAGE_KEYS.LEAVES, updated);
    return updated;
  },

  async saveLeave(leave) {
    const saved = { ...leave };
    if (!saved.id) saved.id = 'leave_' + Date.now();
    const current = await this.getLeaves();
    const updated = [saved, ...current];
    setLocal(STORAGE_KEYS.LEAVES, updated);
    return saved;
  },

  // TASKS
  async getTasks() {
    const cached = getLocal(STORAGE_KEYS.TASKS, null);
    if (cached && cached.length > 0) return cached;
    setLocal(STORAGE_KEYS.TASKS, SEED_TASKS);
    return SEED_TASKS;
  },

  async saveTask(task) {
    const saved = { ...task };
    if (!saved.id) saved.id = 'task_' + Date.now();
    const current = await this.getTasks();
    const idx = current.findIndex(t => t.id === saved.id);
    const updated = idx >= 0 ? current.map(t => t.id === saved.id ? saved : t) : [saved, ...current];
    setLocal(STORAGE_KEYS.TASKS, updated);
    return saved;
  },

  // FEEDBACK
  async getFeedback() {
    const cached = getLocal(STORAGE_KEYS.FEEDBACK, null);
    if (cached && cached.length > 0) return cached;
    setLocal(STORAGE_KEYS.FEEDBACK, SEED_FEEDBACK);
    return SEED_FEEDBACK;
  },

  async saveFeedback(fb) {
    const saved = { ...fb };
    if (!saved.id) saved.id = 'feed_' + Date.now();
    const current = await this.getFeedback();
    const updated = [saved, ...current];
    setLocal(STORAGE_KEYS.FEEDBACK, updated);
    return saved;
  },

  // CERTIFICATES
  async getCertificates() {
    const cached = getLocal(STORAGE_KEYS.CERTIFICATES, null);
    if (cached && cached.length > 0) return cached;
    setLocal(STORAGE_KEYS.CERTIFICATES, SEED_CERTIFICATES);
    return SEED_CERTIFICATES;
  },

  async generateCertificate(certData) {
    const newCert = {
      id: 'cert_' + Date.now(),
      certification_number: `MAC/CET/${new Date().getFullYear()}/${Math.floor(10 + Math.random() * 90)}`,
      status: 'Generated',
      issue_date: new Date().toISOString().slice(0, 10),
      url: "https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/employee-certs/emp_1782235485946340-MAC/CET/2025/01-1782277556872.pdf",
      ...certData
    };
    const current = await this.getCertificates();
    const updated = [newCert, ...current];
    setLocal(STORAGE_KEYS.CERTIFICATES, updated);
    return newCert;
  },

  // LEADS
  async getLeads() {
    const cached = getLocal(STORAGE_KEYS.LEADS, null);
    if (cached && cached.length > 0) return cached;
    setLocal(STORAGE_KEYS.LEADS, SEED_LEADS);
    return SEED_LEADS;
  },

  // BILLS / FINANCE
  async getBills() {
    const cached = getLocal(STORAGE_KEYS.FINANCE, null);
    if (cached && cached.length > 0) return cached;
    setLocal(STORAGE_KEYS.FINANCE, SEED_BILLS);
    return SEED_BILLS;
  },

  async saveBill(bill) {
    const saved = { ...bill };
    if (!saved.id) saved.id = 'bill_' + Date.now();
    const current = await this.getBills();
    const idx = current.findIndex(b => b.id === saved.id);
    const updated = idx >= 0 ? current.map(b => b.id === saved.id ? saved : b) : [saved, ...current];
    setLocal(STORAGE_KEYS.FINANCE, updated);
    return saved;
  },

  async deleteBill(billId) {
    const current = await this.getBills();
    const updated = current.filter(b => b.id !== billId);
    setLocal(STORAGE_KEYS.FINANCE, updated);
    return updated;
  },

  // EVENTS
  async getEvents() {
    const cached = getLocal(STORAGE_KEYS.EVENTS, null);
    if (cached && cached.length > 0) return cached;
    setLocal(STORAGE_KEYS.EVENTS, SEED_EVENTS);
    return SEED_EVENTS;
  },

  // BLACKLIST
  getBlacklist() {
    return getLocal(STORAGE_KEYS.BLACKLIST || 'skillorapath_blacklisted_emails_v5', []);
  },

  isBlacklisted(email) {
    if (!email) return false;
    const list = this.getBlacklist();
    return list.some(item => (typeof item === 'string' ? item : item.email).toLowerCase() === email.toLowerCase());
  },

  toggleBlacklist(email, reason = 'Flagged by HR') {
    if (!email) return [];
    const list = this.getBlacklist();
    const cleanEmail = email.toLowerCase().trim();
    const exists = list.some(item => (typeof item === 'string' ? item : item.email).toLowerCase() === cleanEmail);
    let updated;
    if (exists) {
      updated = list.filter(item => (typeof item === 'string' ? item : item.email).toLowerCase() !== cleanEmail);
    } else {
      updated = [...list, { email: cleanEmail, reason, date: new Date().toISOString() }];
    }
    setLocal(STORAGE_KEYS.BLACKLIST || 'skillorapath_blacklisted_emails_v5', updated);
    return updated;
  },

  // CUSTOM ROLES & DEPARTMENTS (Settings)
  getCustomRoles() {
    return getLocal(STORAGE_KEYS.CUSTOM_ROLES || 'skillorapath_custom_roles_v5', [
      'Full Stack Developer',
      'Backend Developer',
      'Frontend Developer',
      'AI & Machine Learning Engineer',
      'UI/UX Product Designer',
      'Lead HR Manager',
      'DevOps Engineer'
    ]);
  },

  saveCustomRole(newRole) {
    const list = this.getCustomRoles();
    if (!list.includes(newRole)) {
      const updated = [...list, newRole];
      setLocal(STORAGE_KEYS.CUSTOM_ROLES || 'skillorapath_custom_roles_v5', updated);
      return updated;
    }
    return list;
  },

  getCustomDepartments() {
    return getLocal(STORAGE_KEYS.CUSTOM_DEPTS || 'skillorapath_custom_departments_v5', [
      'Executive',
      'Engineering',
      'Design',
      'Marketing',
      'Human Resources',
      'Business'
    ]);
  },

  saveCustomDepartment(newDept) {
    const list = this.getCustomDepartments();
    if (!list.includes(newDept)) {
      const updated = [...list, newDept];
      setLocal(STORAGE_KEYS.CUSTOM_DEPTS || 'skillorapath_custom_departments_v5', updated);
      return updated;
    }
    return list;
  }
};
