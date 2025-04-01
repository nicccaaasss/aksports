
const SUPABASE_URL = "https://yrmpdcpwgsuopkimhjhw.supabase.co" ;
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlybXBkY3B3Z3N1b3BraW1oamh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5ODc2OTcsImV4cCI6MjA1ODU2MzY5N30.hGZ1XaHYWIjTChMQTlNOmG9s8QSpozjq_bufo_ZTAHU";

const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function uploadFile(file, folder) {
    if (!file) return null;
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from(folder).upload(fileName, file);
    if (error) {
        console.error(`Error uploading to ${folder}:`, error);
        return null;
    }
    return `${SUPABASE_URL}/storage/v1/object/public/${folder}/${fileName}`;
}

document.getElementById("studentForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let studentData = {
        name: document.getElementById("name").value.trim(),
        activity: document.getElementById("activity").value,
        gender: document.querySelector('input[name="gender"]:checked')?.value || "",
        dob: document.getElementById("dob").value,
        age: parseInt(document.getElementById("age").value) || null,
        qualification: document.getElementById("qualification").value.trim(),
        father_name: document.getElementById("father_name").value.trim(),
        father_occupation: document.getElementById("father_occupation").value.trim(),
        mother_name: document.getElementById("mother_name").value.trim(),
        mother_occupation: document.getElementById("mother_occupation").value.trim(),
        father_phone: document.getElementById("father_phone").value.trim(),
        father_email: document.getElementById("father_email").value.trim(),
        mother_phone: document.getElementById("mother_phone").value.trim(),
        mother_email: document.getElementById("mother_email").value.trim(),
        address: document.getElementById("address").value.trim()
    };

    const studentPhotoFile = document.getElementById("student_photo").files[0];
    const aadharPhotoFile = document.getElementById("aadhar_photo").files[0];

    studentData.student_photo = studentPhotoFile ? await uploadFile(studentPhotoFile, "student-photo") : null;
    studentData.aadhar_photo = aadharPhotoFile ? await uploadFile(aadharPhotoFile, "aadhar-photo") : null;

    if (!studentData.name || !studentData.activity || !studentData.gender || !studentData.dob || !studentData.age ||
        !studentData.qualification || !studentData.father_name || !studentData.mother_name ||
        !studentData.father_phone || !studentData.mother_phone || !studentData.address) {
        alert("Please fill in all required fields.");
        return;
    }

    let { error } = await supabase.from("students").insert([studentData]);

    if (error) {
        alert("Error submitting form. Please try again.");
        console.error("Error inserting data:", error);
    } else {
        window.location.href = "submission.html";
        document.getElementById("studentForm").reset();
    }
});
