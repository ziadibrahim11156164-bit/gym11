// ==========================================
// 1. مجسم 3D Dumbbell التفاعلي الرئيسي
// ==========================================
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const dumbbell = new THREE.Group();
const metalMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.2 });
const redMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 });

const handleGeo = new THREE.CylinderGeometry(0.12, 0.12, 3.2, 32);
const handle = new THREE.Mesh(handleGeo, metalMat);
handle.rotation.z = Math.PI / 2;
dumbbell.add(handle);

function createPlate(xPos, radius, thickness) {
  const plateGeo = new THREE.CylinderGeometry(radius, radius, thickness, 32);
  const plate = new THREE.Mesh(plateGeo, metalMat);
  plate.rotation.z = Math.PI / 2;
  plate.position.x = xPos;
  dumbbell.add(plate);

  const ringGeo = new THREE.TorusGeometry(radius + 0.02, 0.03, 16, 50);
  const ring = new THREE.Mesh(ringGeo, redMat);
  ring.rotation.y = Math.PI / 2;
  ring.position.x = xPos;
  dumbbell.add(ring);
}

createPlate(-1.1, 0.9, 0.25);
createPlate(-1.4, 0.75, 0.2);
createPlate(1.1, 0.9, 0.25);
createPlate(1.4, 0.75, 0.2);

scene.add(dumbbell);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);
const redLight = new THREE.PointLight(0xff3b30, 4, 50);
redLight.position.set(3, 4, 4);
scene.add(redLight);

camera.position.z = 4.2;

let mouseX = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) - 0.5;
});

function animate() {
  requestAnimationFrame(animate);
  dumbbell.rotation.x += 0.006;
  dumbbell.rotation.y += 0.009;
  dumbbell.rotation.y += (mouseX * 2.5 - dumbbell.rotation.y) * 0.05;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});


// ==========================================
// 2. قاعدة بيانات أنظمة التمارين مفصلة بالأيام
// ==========================================
const workoutProgramsData = {
  arnold_split: {
    title: "نظام آرنولد سبليت (Arnold Split)",
    desc: "البرنامج المفضل لأسطورة كمال الأجسام آرنولد شوارزنيجر لتحقيق ضخامة متناسقة وقوة جبارة.",
    days: [
      {
        dayTitle: "اليوم الأول: الصدر والظهر (Chest & Back)",
        exercises: [
          "• Bench Press (بار مستوي للصدر): 4 مجموعات × 8-10 تكرارات",
          "• Incline Dumbbell Press (تجميع عالي): 4 مجموعات × 10 تكرارات",
          "• Barbell Rows (سحب بار للظهر): 4 مجموعات × 8 تكرارات",
          "• Lat Pulldown (سحب عالي واسع): 4 مجموعات × 12 تكرار",
          "• Dumbbell Pullover (بول أوفير): 3 مجموعات × 12 تكرار"
        ]
      },
      {
        dayTitle: "اليوم الثاني: الأكتاف والذراعين (Shoulders & Arms)",
        exercises: [
          "• Overhead Barbell Press (ضغط كتف أمامي): 4 مجموعات × 8 تكرارات",
          "• Lateral Raises (رفرفة جانبي للكتف): 4 مجموعات × 12-15 تكرار",
          "• Barbell Bicep Curls (بايسبس بالبار): 4 مجموعات × 10 تكرارات",
          "• Triceps Skullcrushers (ترايسبس بار سكال كراشر): 4 مجموعات × 10 تكرارات",
          "• Hammer Curls + Cable Pushdown (سوبر سيت باي وتراي): 3 مجموعات"
        ]
      },
      {
        dayTitle: "اليوم الثالث: الأرجل والبطن (Legs & Abs)",
        exercises: [
          "• Barbell Squats (سكوات عميق): 4 مجموعات × 8 تكرارات",
          "• Leg Press (مكبس أرجل): 4 مجموعات × 10-12 تكرار",
          "• Romanian Deadlift (ديدليفت خلفي): 4 مجموعات × 10 تكرارات",
          "• Calf Raises (سمانة واقف): 5 مجموعات × 15 تكرار",
          "• Hanging Leg Raises (بطن عقلة): 4 مجموعات حتى الفشل العضلي"
        ]
      }
    ]
  },
  ppl: {
    title: "نظام Push / Pull / Legs",
    desc: "النظام العلمي الأكثر كفاءة لضمان استشفاء كل مجموعة عضلية مع تحقيق أقصى بناء عضلي.",
    days: [
      {
        dayTitle: "اليوم الأول: الدفع (Push - صدر / أكتاف / تراي)",
        exercises: [
          "• Incline Barbell Press (صدر عالي بار): 4 مجموعات × 8 تكرارات",
          "• Flat Dumbbell Press (صدر مستوي دامبل): 3 مجموعات × 10 تكرارات",
          "• Dumbbell Shoulder Press (ضغط أكتاف): 4 مجموعات × 10 تكرارات",
          "• Cable Lateral Raises (رفرفة جانبي كابل): 4 مجموعات × 12 تكرار",
          "• Tricep Rope Pushdown (ترايسبس حبل): 4 مجموعات × 12 تكرار"
        ]
      },
      {
        dayTitle: "اليوم الثاني: السحب (Pull - ظهر / باي / خلفيات)",
        exercises: [
          "• Lat Pulldown (سحب عالي واسع): 4 مجموعات × 10 تكرارات",
          "• Seated Cable Row (سحب أرضي سحب ضيق): 4 مجموعات × 10 تكرارات",
          "• Face Pulls (سحب كابل للكتف الخلفي): 4 مجموعات × 15 تكرار",
          "• Incline Dumbbell Curls (بايسبس مائل): 4 مجموعات × 10 تكرارات",
          "• Hammer Curls (هامر بالدامبلز): 3 مجموعات × 12 تكرار"
        ]
      },
      {
        dayTitle: "اليوم الثالث: الأرجل (Legs)",
        exercises: [
          "• Barbell Squat (سكوات بالبار): 4 مجموعات × 8 تكرارات",
          "• Bulgarian Split Squat (سكوات بلغاري): 3 مجموعات × 10 لكل رجل",
          "• Leg Extensions (تمرين أماميات): 4 مجموعات × 12 تكرار",
          "• Lying Leg Curls (تمرين خلفيات): 4 مجموعات × 12 تكرار",
          "• Standing Calf Raises (تمارين السمانة): 4 مجموعات × 15 تكرار"
        ]
      }
    ]
  },
  upper_lower: {
    title: "نظام Upper / Lower",
    desc: "نظام رائع لزيادة أوزان القوة وتضخيم الكتلة العضلية بالتساوي.",
    days: [
      {
        dayTitle: "اليوم الأول: الجزء العلوي (Upper Body)",
        exercises: [
          "• Bench Press (بنش بريس): 4 مجموعات × 6 تكرارات",
          "• Barbell Row (سحب بار للظهر): 4 مجموعات × 6 تكرارات",
          "• Shoulder Overhead Press (ضغط كتف): 3 مجموعات × 8 تكرارات",
          "• Lat Pulldown (سحب عالي): 3 مجموعات × 10 تكرارات",
          "• Bicep & Tricep Superset (سوبر سيت باي وتراي): 3 مجموعات × 12 تكرار"
        ]
      },
      {
        dayTitle: "اليوم الثاني: الجزء السفلي (Lower Body)",
        exercises: [
          "• Barbell Squat (سكوات مركب): 4 مجموعات × 6 تكرارات",
          "• Romanian Deadlift (ديدليفت روماني): 4 مجموعات × 8 تكرارات",
          "• Leg Press (مكبس الأرجل): 3 مجموعات × 10 تكرارات",
          "• Calf Raises (تمرين السمانة): 4 مجموعات × 12 تكرار",
          "• Planks (تمرين اللوح للبطن): 3 مجموعات لمدة دقيقة"
        ]
      }
    ]
  },
  bro_split: {
    title: "نظام Bro Split",
    desc: "تدمير عضلة واحدة في كل يوم تدريبي لضخ دمي أقصى وزيادة التركيز العضلي.",
    days: [
      { dayTitle: "اليوم الأول: الصدر (Chest Day)", exercises: ["• Bench Press: 4×8", "• Incline Press: 4×10", "• Cable Flyes: 4×12", "• Dips: 3×10"] },
      { dayTitle: "اليوم الثاني: الظهر (Back Day)", exercises: ["• Deadlift: 4×6", "• Lat Pulldown: 4×10", "• Barbell Row: 4×8", "• Cable Pullover: 3×12"] },
      { dayTitle: "اليوم الثالث: الأكتاف (Shoulders Day)", exercises: ["• Military Press: 4×8", "• Side Lateral Raises: 4×12", "• Rear Delt Flyes: 4×15"] },
      { dayTitle: "اليوم الرابع: الذراعين (Arms Day)", exercises: ["• Barbell Curls: 4×10", "• Skullcrushers: 4×10", "• Hammer Curls: 4×12", "• Cable Pushdown: 4×12"] },
      { dayTitle: "اليوم الخامس: الأرجل (Legs Day)", exercises: ["• Squat: 4×8", "• Leg Press: 4×10", "• Leg Extension: 4×12", "• Lying Leg Curl: 4×12"] }
    ]
  },
  full_body: {
    title: "نظام Full Body",
    desc: "استهداف كل العضلات الرئيسية في كل حصة تدريبية لرفع معدلات الحرق والبناء.",
    days: [
      {
        dayTitle: "تمرين الجسم الكامل (Full Body Workout A)",
        exercises: [
          "• Barbell Squat: 3 مجموعات × 8 تكرارات",
          "• Bench Press: 3 مجموعات × 8 تكرارات",
          "• Barbell Row: 3 مجموعات × 8 تكرارات",
          "• Dumbbell Shoulder Press: 3 مجموعات × 10 تكرارات",
          "• Planks: 3 مجموعات"
        ]
      }
    ]
  }
};

function openProgram(key) {
  const prog = workoutProgramsData[key];
  document.getElementById('programsList').style.display = 'none';
  document.getElementById('programDetails').style.display = 'block';

  document.getElementById('selectedProgramTitle').innerText = prog.title;
  document.getElementById('selectedProgramDesc').innerText = prog.desc;

  const container = document.getElementById('workoutDaysContainer');
  container.innerHTML = '';

  prog.days.forEach(day => {
    const dayBox = document.createElement('div');
    dayBox.className = 'day-box';
    
    let exListHTML = `<ul class="exercise-list-ul">`;
    day.exercises.forEach(ex => {
      exListHTML += `<li>${ex}</li>`;
    });
    exListHTML += `</ul>`;

    dayBox.innerHTML = `
      <div class="day-title">${day.dayTitle}</div>
      ${exListHTML}
    `;
    container.appendChild(dayBox);
  });
}

function closeProgramDetails() {
  document.getElementById('programDetails').style.display = 'none';
  document.getElementById('programsList').style.display = 'block';
}


// ==========================================
// 3. حاسبة السعرات والبرنامج المتكامل بالـ AI
// ==========================================
function generateAIPlan() {
  const weight = parseFloat(document.getElementById('userWeight').value);
  const height = parseFloat(document.getElementById('userHeight').value);
  const age = parseFloat(document.getElementById('userAge').value);
  const goal = document.getElementById('userGoal').value;

  if (!weight || !height || !age) {
    alert('يرجى كتابة أرقام الوزن والطول والسن لتوليد برنامجك المخصص!');
    return;
  }

  document.getElementById('planResult').style.display = 'none';
  document.getElementById('aiLoader').style.display = 'block';

  setTimeout(() => {
    document.getElementById('aiLoader').style.display = 'none';
    
    let bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    let calories = Math.round(bmr * 1.55);
    let protein = Math.round(weight * 2.2);
    let fats = Math.round(weight * 0.9);
    let carbs = 0;

    let dietHTML = "";
    let workoutHTML = "";

    if (goal === "lose") {
      calories -= 500;
      carbs = Math.round((calories - (protein * 4 + fats * 9)) / 4);
      dietHTML = `
        • <strong>وجبة الإفطار:</strong> 3 بيضات كاملة + 60ج شوفان + حبة فاكهة.<br>
        • <strong>وجبة الغداء:</strong> 200ج صدور دجاج مشوية + 150ج أرز مسلوق + سلطة خضراء مع زيت زيتون.<br>
        • <strong>وجبة العشاء:</strong> 200ج جبن قريش أو زبادي يوناني + 30ج مكسرات نية.<br>
        • <strong>توصية الماء:</strong> شرب 3.5 لتر ماء يومياً على الأقل.
      `;
      workoutHTML = `
        <strong>جدول التمارين المخصص (نظام PPL المطور):</strong><br>
        • <strong>اليوم 1 (Push):</strong> بنش مستوي بار + تجميع عالي + ضغط كتف + رفرفة جانبي + ترايسبس.<br>
        • <strong>اليوم 2 (Pull):</strong> سحب عالي للظهر + سحب أرضي + بايسبس + هامر + كتف خلفي.<br>
        • <strong>اليوم 3 (Legs):</strong> سكوات بار + مكبس أرجل + أماميات وخلفيات + سمانة.<br>
        • <strong>الكارديو:</strong> 20 دقيقة مشي سريع بزاوية ميل بعد كل حصة تدريبية.
      `;
    } else if (goal === "gain") {
      calories += 450;
      carbs = Math.round((calories - (protein * 4 + fats * 9)) / 4);
      dietHTML = `
        • <strong>وجبة الإفطار:</strong> 4 بيضات + 80ج شوفان مع موز وعسل وزبدة فول سوداني.<br>
        • <strong>وجبة الغداء:</strong> 250ج لحم بقر أو دجاج + 250ج أرز أبيض أو بطاطس مسلوقة.<br>
        • <strong>وجبة سناك:</strong> مشروب واي بروتين + حبة موز + 40ج مكسرات.<br>
        • <strong>وجبة العشاء:</strong> 200ج جبنة قريش + زيت زيتون + خبز أسمر كامل.
      `;
      workoutHTML = `
        <strong>جدول التمارين المخصص (نظام آرنولد سبليت الضخم):</strong><br>
        • <strong>اليوم 1:</strong> تمرين الصدر والظهر معاً لبناء كادر علوي عريض.<br>
        • <strong>اليوم 2:</strong> تمرين الأكتاف والذراعين بتركيز وتضخيم فائق.<br>
        • <strong>اليوم 3:</strong> تمرين الأرجل المركب بأوزان ثقيلة وتكرارات 6-10.
      `;
    } else {
      carbs = Math.round((calories - (protein * 4 + fats * 9)) / 4);
      dietHTML = `
        • <strong>نظام متوازن:</strong> 3 وجبات رئيسية متوازنة تحتوي على مصدر بروتين صافي، نشويات معقدة، ودهون صحية للحفاظ على ثابت الوزن وزيادة الكتلة الصافية.
      `;
      workoutHTML = `
        <strong>جدول التمارين المخصص (Upper / Lower 4 أيام):</strong><br>
        • يومين للجزء العلوي ويومين للجزء السفلي مع أيام راحة واستشفاء بينية.
      `;
    }

    document.getElementById('resCalories').innerText = calories;
    document.getElementById('resProtein').innerText = protein + 'g';
    document.getElementById('resCarbs').innerText = carbs + 'g';
    document.getElementById('resFats').innerText = fats + 'g';

    document.getElementById('resDiet').innerHTML = dietHTML;
    document.getElementById('resWorkout').innerHTML = workoutHTML;

    document.getElementById('planResult').style.display = 'block';
  }, 1000);
}


// ==========================================
// 4. حفظ الأوزان محلياً (LocalStorage)
// ==========================================
document.addEventListener('DOMContentLoaded', loadSavedExercises);

function addExercise() {
  const name = document.getElementById('exName').value;
  const weight = document.getElementById('exWeight').value;

  if (!name || !weight) {
    alert('يرجى كتابة اسم التمرين والوزن أولاً!');
    return;
  }

  const newLog = { name, weight, id: Date.now() };

  // جلب البيانات السابقة
  let logs = JSON.parse(localStorage.getItem('redgym_logs') || '[]');
  logs.unshift(newLog);

  // حفظ القائمة المحدثة
  localStorage.setItem('redgym_logs', JSON.stringify(logs));

  document.getElementById('exName').value = '';
  document.getElementById('exWeight').value = '';

  renderLogs(logs);
}

function loadSavedExercises() {
  let logs = JSON.parse(localStorage.getItem('redgym_logs') || '[]');
  renderLogs(logs);
}

function renderLogs(logs) {
  const list = document.getElementById('logsList');
  if (!logs || logs.length === 0) {
    list.innerHTML = `<p class="empty-msg">لا توجد تمارين مسجلة حتى الآن.</p>`;
    return;
  }

  list.innerHTML = '';
  logs.forEach(item => {
    const div = document.createElement('div');
    div.style.cssText = "background:rgba(18,5,5,0.85); padding:10px 14px; border-radius:10px; margin-top:8px; display:flex; justify-content:space-between; align-items:center; border:1px solid rgba(255,59,48,0.2); font-size:13px;";
    div.innerHTML = `<span>🏋️‍♂️ <strong>${item.name}</strong></span><span style="color:#ff3b30; font-weight:bold;">${item.weight} كجم</span>`;
    list.appendChild(div);
  });
}

function clearLogs() {
  if (confirm('هل أنت تأكد من مسح جميع التمارين المسجلة؟')) {
    localStorage.removeItem('redgym_logs');
    renderLogs([]);
  }
}

// Navigation
function goToTab(tabName, titleText) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  const activePage = document.getElementById('page-' + tabName);
  const activeBtn = document.getElementById('btn-' + tabName);

  if (activePage) activePage.classList.add('active');
  if (activeBtn) activeBtn.classList.add('active');
  document.getElementById('pageTitle').innerText = titleText;
}