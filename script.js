/* =====================================================
   SHOPFLOOR MANAGEMENT QUIZ — SCRIPT.JS
   Pure Vanilla JavaScript, ไม่ใช้ Framework
   ===================================================== */

'use strict';

/* =====================================================
   SECTION 1: ข้อมูลข้อสอบ (Quiz Data)
   correctIndex: 0=A, 1=B, 2=C, 3=D
   ===================================================== */
const QUIZ_DATA = [
  {
    id: 1,
    question: 'ในการจัดทำ Bullet #2 ผังเครื่องจักรและจำนวนพนักงานต้องถูกออกแบบให้มีอัตราการสมดุลสายการผลิต (LBR) อยู่ที่เท่าใด',
    correctIndex: 0,
    options: [
      {
        label: 'A',
        text: 'LBR ≥ 95%',
        explanation: 'ตามมาตรฐานของโปรแกรมการจัดการหน้างาน การออกแบบผังใน Bullet #2 และ #3 ต้องมุ่งเน้นความสมดุลสูงสุดเพื่อให้สายการผลิตมีประสิทธิภาพ ✅ ข้อนี้ถูกต้อง'
      },
      {
        label: 'B',
        text: 'LBR ≥ 85%',
        explanation: 'ตัวเลขนี้อาจเป็นเกณฑ์ขั้นต่ำสำหรับอุตสาหกรรมทั่วไป แต่ในโปรแกรมนี้กำหนดมาตรฐานที่เข้มงวดกว่าเพื่อให้เกิดประสิทธิภาพสูงสุด'
      },
      {
        label: 'C',
        text: 'LBR ≥ 90%',
        explanation: 'แม้จะเป็นตัวเลขที่สูง แต่ยังไม่ถึงเกณฑ์ที่กำหนดไว้ในขั้นตอนการวางแผน Bullet #2 ตามระเบียบปฏิบัติ'
      },
      {
        label: 'D',
        text: 'LBR ≥ 75%',
        explanation: 'ค่า 75% เป็นเกณฑ์ประสิทธิภาพขั้นต่ำสำหรับการปล่อยตัวพนักงานจากการฝึกอบรมของ CSA ไม่ใช่เกณฑ์การสมดุลสายการผลิต'
      }
    ]
  },
  {
    id: 2,
    question: 'ขั้นตอนการประชุมเตรียมความพร้อมครั้งที่ 2 (PPM #2) จะต้องดำเนินการล่วงหน้าอย่างน้อยกี่วันก่อนเริ่มการเย็บจริง',
    correctIndex: 2,
    options: [
      {
        label: 'A',
        text: '25 วัน',
        explanation: '25 วันเป็นระยะเวลาลีดไทม์ในการจัดทำ Bullet #2 ให้เสร็จสิ้น ไม่ใช่กำหนดการของ PPM #2'
      },
      {
        label: 'B',
        text: '30 วัน',
        explanation: '30 วันเป็นระยะเวลาก่อนเริ่มงานเย็บที่ต้องจัดส่งชุดข้อมูล Bullet #1 ให้เรียบร้อย'
      },
      {
        label: 'C',
        text: '8 วัน',
        explanation: 'การจัดประชุมล่วงหน้า 8 วันช่วยให้ทีมงานมีเวลาเพียงพอในการแก้ไขปัญหาที่พบจากการทดลองเย็บ (One-piece trial) ก่อนเริ่มงานจริง ✅ ข้อนี้ถูกต้อง'
      },
      {
        label: 'D',
        text: '12 วัน',
        explanation: 'ระยะเวลา 12 วันเป็นขั้นตอนการเตรียมผ้าและแผนการตัด ไม่ใช่กำหนดการสำหรับการประชุม PPM #2'
      }
    ]
  },
  {
    id: 3,
    question: 'เพื่อรักษาความเสถียรของแผนการผลิต แผนกวางแผน (PPC) จะต้องรักษาช่วงเวลาเย็บที่ห้ามเปลี่ยนแปลง (Frozen Planning Window) ไว้อย่างน้อยเท่าใด',
    correctIndex: 0,
    options: [
      {
        label: 'A',
        text: '2 สัปดาห์',
        explanation: 'การคงแผนไว้ 2 สัปดาห์ช่วยป้องกันการเปลี่ยนแปลงที่บ่อยเกินไป ซึ่งจะส่งผลกระทบต่อการเตรียมวัตถุดิบและเครื่องจักรของทีมหน้างาน ✅ ข้อนี้ถูกต้อง'
      },
      {
        label: 'B',
        text: '3 วัน',
        explanation: 'การเปลี่ยนแผนทุก 3 วันจะทำให้เกิดความโกลาหลในกระบวนการเตรียมการ (Preparation) สั้นเกินไป'
      },
      {
        label: 'C',
        text: '1 สัปดาห์',
        explanation: '1 สัปดาห์อาจสั้นเกินไปสำหรับการเตรียมความพร้อมด้านเครื่องจักรและอุปกรณ์พิเศษที่มีความซับซ้อน'
      },
      {
        label: 'D',
        text: '1 เดือน',
        explanation: 'แม้จะสร้างความเสถียรได้มาก แต่ในทางปฏิบัติอาจขาดความยืดหยุ่นต่อสถานการณ์วัตถุดิบที่เปลี่ยนแปลง'
      }
    ]
  },
  {
    id: 4,
    question: 'ในวันเปลี่ยนแผนการผลิต (Change Over Day) ทีมงานจะต้องระบุปัญหาที่พบจากการเย็บ 20 ตัวแรกให้ได้ภายในระยะเวลาเท่าใด',
    correctIndex: 0,
    options: [
      {
        label: 'A',
        text: '2 ชั่วโมงแรก',
        explanation: 'การตรวจพบปัญหาภายใน 2 ชั่วโมงแรกช่วยให้สามารถกำหนด Action Plan และแก้ไขได้ทันทีก่อนที่จะเกิดงานเสียจำนวนมาก ✅ ข้อนี้ถูกต้อง'
      },
      {
        label: 'B',
        text: '1 วัน',
        explanation: 'การรอจนจบวันเพื่อสรุปปัญหาขัดกับหลักการแก้ไขปัญหาทันที (Immediate Action) ของระบบการจัดการหน้างาน'
      },
      {
        label: 'C',
        text: '30 นาทีแรก',
        explanation: 'ในทางปฏิบัติ 30 นาทีอาจเร็วเกินไปที่จะเห็นภาพรวมของความสมดุลสายการผลิตและปัญหาคุณภาพครบทุกจุด'
      },
      {
        label: 'D',
        text: '4 ชั่วโมงแรก',
        explanation: '4 ชั่วโมงหรือครึ่งวันอาจทำให้ปัญหาสะสมและส่งผลกระทบต่อเป้าหมายผลผลิตในวันแรก'
      }
    ]
  },
  {
    id: 5,
    question: 'ในช่วง 3 วันแรกของการผลิต (First 3 Days) หากพบว่าผลผลิตรายชั่วโมงไม่เป็นไปตามเป้าหมาย (Gap) ทีมงานต้องดำเนินการอย่างไร',
    correctIndex: 1,
    options: [
      {
        label: 'A',
        text: 'เพิ่มจำนวนพนักงานเย็บทันทีโดยไม่ต้องวิเคราะห์',
        explanation: 'การเพิ่มคนโดยไม่วิเคราะห์รากเหง้าของปัญหา (Root Cause) อาจไม่ช่วยแก้ปัญหาคอขวดและทำให้อัตราส่วนกำไรลดลง'
      },
      {
        label: 'B',
        text: 'หาสาเหตุและดำเนินการแก้ไขภายใน 1 ชั่วโมง',
        explanation: 'การจัดการปัญหาภายใน 1 ชั่วโมงช่วยลดโอกาสที่เป้าหมายรวมของวันจะล้มเหลวและสร้างความตระหนักในเรื่องความเร็วในการแก้ปัญหา ✅ ข้อนี้ถูกต้อง'
      },
      {
        label: 'C',
        text: 'ปรับเป้าหมายรายชั่วโมงลงให้สอดคล้องกับงานจริง',
        explanation: 'การลดเป้าหมายโดยไม่พยายามกำจัดอุปสรรคเป็นการหนีปัญหาและขัดต่อหลักการปรับปรุงอย่างต่อเนื่อง'
      },
      {
        label: 'D',
        text: 'รอสรุปผลในการประชุม Daily Forecast วันถัดไป',
        explanation: 'การรอจนถึงวันถัดไปจะทำให้เสียโอกาสในการเพิ่มประสิทธิภาพและอาจทำให้ปัญหาคอขวดสะสมมากขึ้น'
      }
    ]
  },
  {
    id: 6,
    question: 'เป้าหมายสำคัญของการพัฒนาทักษะพนักงาน (Multi-skill training) หลังจากเริ่มผลิตไปแล้ว 3 วัน คือข้อใด',
    correctIndex: 3,
    options: [
      {
        label: 'A',
        text: 'ประสิทธิภาพพนักงานต้องถึง 100% ทุกคน',
        explanation: 'เป็นเป้าหมายที่อุดมคติเกินไปในช่วงเริ่มต้นการผลิต โดยเกณฑ์มาตรฐานสำหรับการปล่อยตัวจากการฝึกอบรมจะอยู่ที่ 75%'
      },
      {
        label: 'B',
        text: 'พนักงานทุกคนต้องเปลี่ยนเครื่องจักรเองได้',
        explanation: 'การตั้งค่าเครื่องจักรเป็นหน้าที่ของทีม MC หรือช่างเทคนิค พนักงานเย็บเน้นที่ทักษะการเย็บตามมาตรฐาน NBP'
      },
      {
        label: 'C',
        text: 'พนักงาน 1 คนต้องเย็บได้ทุกขั้นตอนใน Bullet',
        explanation: 'พนักงาน Multi-skill ไม่จำเป็นต้องทำได้ทุกขั้นตอน แต่ควรทำได้ในขั้นตอนที่เกี่ยวเนื่องกันเพื่อรองรับการปรับสมดุลสายงาน'
      },
      {
        label: 'D',
        text: 'ค่า Fill rate พนักงาน Multi-skill ≥ 35%',
        explanation: 'การเพิ่ม Fill rate ของพนักงานที่มีทักษะหลากหลายช่วยให้สายการผลิตมีความยืดหยุ่นในการจัดการพนักงานที่ขาดงานหรือจุดที่เป็นคอขวด ✅ ข้อนี้ถูกต้อง'
      }
    ]
  },
  {
    id: 7,
    question: 'ข้อใดเป็นกฎเหล็กที่สำคัญที่สุดในการประชุม Daily Forecast Meeting เพื่อให้การประชุมมีประสิทธิภาพ',
    correctIndex: 2,
    options: [
      {
        label: 'A',
        text: 'เน้นการรายงานผลงานที่สำเร็จแล้วเท่านั้น',
        explanation: 'การประชุมเน้นที่การวิเคราะห์ Gap และรากเหง้าของปัญหามากกว่าการรายงานเพียงความสำเร็จ'
      },
      {
        label: 'B',
        text: 'อนุญาตให้มีการถกเถียงโดยไม่ต้องมีข้อสรุป',
        explanation: 'ทุกหัวข้อต้องมีทางออกและ Action Plan ที่ระบุเจ้าของงานและกำหนดเวลาเสร็จที่ชัดเจน'
      },
      {
        label: 'C',
        text: "ห้ามใช้คำพูดว่า 'ยังไม่ได้เช็ค' หรือ 'จะเช็คให้ทีหลัง'",
        explanation: "การประชุมต้องใช้ข้อมูลจริงและข้อเท็จจริงเพื่อตัดสินใจ การไม่ทราบข้อมูลจะทำให้ Action Plan ล่าช้าและไม่แม่นยำ ✅ ข้อนี้ถูกต้อง"
      },
      {
        label: 'D',
        text: 'ต้องใช้เวลาในการประชุมอย่างน้อย 1 ชั่วโมง',
        explanation: 'มาตรฐานกำหนดให้ประชุมเสร็จภายใน 30–45 นาที เพื่อไม่ให้กระทบเวลาการบริหารงานหน้างาน'
      }
    ]
  },
  {
    id: 8,
    question: 'ในการควบคุมคุณภาพหน้างาน (Quality Control) ทีม Inline QC จะต้องทำการวิเคราะห์คราบน้ำมันและการตรวจสอบจุดวิกฤต (CTQ) บ่อยแค่ไหน',
    correctIndex: 1,
    options: [
      {
        label: 'A',
        text: 'ทุกๆ 1 ชั่วโมง',
        explanation: 'การตรวจทุกชั่วโมงอาจใช้ทรัพยากรบุคคลมากเกินไป ซึ่งมาตรฐานกำหนดไว้ที่ 2 ชั่วโมงเพื่อให้สมดุลกับการทำงาน'
      },
      {
        label: 'B',
        text: 'ทุกๆ 2 ชั่วโมง',
        explanation: 'การตรวจสอบเป็นระยะทุก 2 ชั่วโมงช่วยให้ตรวจพบความผิดปกติของเครื่องจักรและคุณภาพได้ทันท่วงทีก่อนส่งต่องานไปยังขั้นตอนถัดไป ✅ ข้อนี้ถูกต้อง'
      },
      {
        label: 'C',
        text: 'วันละ 2 ครั้ง (เช้า–บ่าย)',
        explanation: 'ความถี่ที่ต่ำเกินไปอาจทำให้พบปัญหาคุณภาพช้าเกินไปจนแก้ไขไม่ทันในกะนั้น'
      },
      {
        label: 'D',
        text: 'สุ่มตรวจเมื่อมีพนักงานแจ้งปัญหา',
        explanation: 'การควบคุมคุณภาพต้องเป็นเชิงรุกและทำตามรอบเวลาที่กำหนด ไม่ใช่รอรับแจ้งเพียงอย่างเดียว'
      }
    ]
  },
  {
    id: 9,
    question: 'หากปัญหาที่พบในสายการผลิตไม่สามารถแก้ไขได้ภายใน 1 วัน หรือเกิดปัญหาซ้ำเดิม ทีมงานต้องปฏิบัติตามกฎใด',
    correctIndex: 2,
    options: [
      {
        label: 'A',
        text: 'Replacement Rule (กฎการเปลี่ยนพนักงาน)',
        explanation: 'การเปลี่ยนคนอาจไม่ใช่การแก้ปัญหาที่รากเหง้าหากสาเหตุมาจากเครื่องจักรหรือวิธีการทำงาน'
      },
      {
        label: 'B',
        text: 'Planning Revision (การปรับแผนลดเป้าหมาย)',
        explanation: 'ควรเป็นทางเลือกสุดท้ายหลังจากพยายามแก้ไขปัญหาด้วยทรัพยากรที่มีอย่างเต็มที่แล้ว'
      },
      {
        label: 'C',
        text: 'Escalation Rule (กฎการยกระดับปัญหา)',
        explanation: 'การยกระดับปัญหาไปยังระดับบริหารช่วยให้ได้รับทรัพยากรหรือการตัดสินใจที่จำเป็นเพื่อกำจัดอุปสรรคที่เกินความสามารถของทีมหน้างาน ✅ ข้อนี้ถูกต้อง'
      },
      {
        label: 'D',
        text: 'Ignore Rule (กฎการปล่อยผ่าน)',
        explanation: 'ขัดต่อหลักการ Lean และคุณภาพ ซึ่งจะทำให้ปัญหาบานปลายและกระทบต่อต้นทุนการผลิต'
      }
    ]
  },
  {
    id: 10,
    question: "เกณฑ์ประสิทธิภาพพนักงานที่ CSA กำหนดไว้ว่าจะต้องทำได้ถึงเท่าใดจึงจะสามารถ 'ปล่อยตัว' (Release) จากการฝึกอบรมได้",
    correctIndex: 2,
    options: [
      {
        label: 'A',
        text: '≥ 95%',
        explanation: '95% เป็นเป้าหมายของ LBR ในการออกแบบผัง ไม่ใช่เป้าหมายประสิทธิภาพรายบุคคลในช่วงเริ่มต้น'
      },
      {
        label: 'B',
        text: '≥ 60%',
        explanation: 'ค่า 60% เป็นเกณฑ์สำหรับการฝึกอบรมพนักงานในส่วนของ QCO ไม่ใช่เกณฑ์ของ CSA สำหรับพนักงาน Multi-skill'
      },
      {
        label: 'C',
        text: '≥ 75%',
        explanation: 'ระดับประสิทธิภาพ 75% แสดงว่าพนักงานมีความสามารถในการเย็บตามมาตรฐานคุณภาพและความเร็วที่ยอมรับได้ในสายผลิตจริง ✅ ข้อนี้ถูกต้อง'
      },
      {
        label: 'D',
        text: '≥ 50%',
        explanation: '50% ถือว่าต่ำเกินไปสำหรับการปล่อยตัวเข้าสู่สายการผลิตหลัก เพราะจะทำให้เกิดคอขวดได้ง่าย'
      }
    ]
  }
];

/* =====================================================
   SECTION 2: STATE — สถานะแอพ
   ===================================================== */
const state = {
  screen: 'loading',        // 'loading' | 'home' | 'quiz' | 'result'
  mode: null,               // 'pre' | 'post'
  name: '',                 // ชื่อผู้สอบ
  questions: [],            // shuffled questions array
  currentIndex: 0,          // index ข้อปัจจุบัน
  answers: [],              // [{questionId, selectedIndex, correct}]
  answered: false,          // ตอบข้อนี้แล้วหรือยัง
  theme: 'light',           // 'light' | 'dark'
};

/* =====================================================
   SECTION 3: UTILITY FUNCTIONS
   ===================================================== */

/** Fisher-Yates Shuffle — สุ่มลำดับอาร์เรย์ (ไม่ mutate ต้นฉบับ) */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** บันทึกลง localStorage */
function saveLS(key, value) {
  try {
    localStorage.setItem('sfmq_' + key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage error:', e);
  }
}

/** โหลดจาก localStorage */
function loadLS(key) {
  try {
    const raw = localStorage.getItem('sfmq_' + key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/** แสดงผลวันที่ไทย */
function formatDate(d = new Date()) {
  const y = d.getFullYear() + 543; // พ.ศ.
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  const h  = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${da}/${mo}/${y} เวลา ${h}:${mi} น.`;
}

/** ชื่อไฟล์สำหรับบันทึกภาพ */
function buildFilename() {
  const d = new Date();
  const dateStr = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
  const score   = state.answers.filter(a => a.correct).length;
  const pct     = Math.round((score / state.questions.length) * 100);
  const modeStr = state.mode === 'pre' ? 'PreTest' : 'PostTest';
  return `Shopfloor_Quiz_${modeStr}_${pct}pct_${dateStr}.png`;
}

/** คำนวณ Grade จากคะแนน */
function getGrade(score, total) {
  const pct = (score / total) * 100;
  if (pct >= 90) return { label: 'ดีเยี่ยม', cls: 'grade-excellent', emoji: '🏆', summary: 'ผลการทดสอบอยู่ในระดับดีเยี่ยม คุณมีความเข้าใจเนื้อหาอย่างครบถ้วน' };
  if (pct >= 75) return { label: 'ผ่านเกณฑ์ดี', cls: 'grade-good',      emoji: '🎯', summary: 'ผลการทดสอบผ่านเกณฑ์ในระดับดี พร้อมสำหรับการปฏิบัติงานจริง' };
  if (pct >= 60) return { label: 'ผ่านเกณฑ์', cls: 'grade-pass',      emoji: '✅', summary: 'ผลการทดสอบผ่านเกณฑ์ขั้นต่ำ ควรศึกษาเพิ่มเติมในส่วนที่ตอบผิด' };
  return           { label: 'ควรปรับปรุง', cls: 'grade-fail',      emoji: '📚', summary: 'ผลการทดสอบต่ำกว่าเกณฑ์ กรุณาศึกษาเนื้อหาเพิ่มเติมก่อนทดสอบอีกครั้ง' };
}

/** แสดง Toast notification */
function showToast(msg, duration = 2500) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

/** สลับหน้า (Screen) */
function goScreen(name) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  const el = document.getElementById('screen-' + name);
  if (el) {
    el.classList.add('active');
    el.scrollTop = 0;
  }
  state.screen = name;
  syncThemeIcons();
}

/** Sync theme toggle icons ทุกปุ่ม */
function syncThemeIcons() {
  document.querySelectorAll('.theme-icon').forEach(icon => {
    icon.textContent = state.theme === 'dark' ? '🌙' : '☀️';
  });
}

/** Toggle Dark/Light mode */
function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', state.theme);
  saveLS('theme', state.theme);
  syncThemeIcons();
}

/* =====================================================
   SECTION 4: HOME SCREEN
   ===================================================== */
function renderHome() {
  // อ่านชื่อที่เคยกรอกไว้
  const savedName = loadLS('name') || '';
  const inputEl   = document.getElementById('input-name');
  if (inputEl) inputEl.value = savedName;
  state.name = savedName;

  // แสดง Score History
  renderHistoryCards();

  // Event Listeners — Home buttons
  bindHomeEvents();
}

function renderHistoryCards() {
  const container = document.getElementById('history-cards');
  if (!container) return;

  const preData  = loadLS('result_pre');
  const postData = loadLS('result_post');

  container.innerHTML = '';
  container.appendChild(buildHistoryCard('Pre-test',  'pre',  preData));
  container.appendChild(buildHistoryCard('Post-test', 'post', postData));
}

function buildHistoryCard(label, mode, data) {
  const div = document.createElement('div');
  div.className = 'history-card' + (data ? '' : ' empty');

  if (data) {
    const pct = Math.round((data.score / data.total) * 100);
    div.innerHTML = `
      <span class="hcard-badge ${mode}">${label}</span>
      <div class="hcard-score">${data.score}<span>/${data.total}</span></div>
      <div class="hcard-pct">${pct}%</div>
      <div class="hcard-date">📅 ${data.date}</div>
    `;
  } else {
    div.innerHTML = `
      <span class="hcard-badge ${mode}">${label}</span>
      <div class="hcard-empty">ยังไม่มีผล<br/>การทดสอบ</div>
    `;
  }
  return div;
}

function bindHomeEvents() {
  // ปุ่ม Pre-test
  const btnPre = document.getElementById('btn-pre');
  if (btnPre) {
    btnPre.onclick = () => startQuiz('pre');
  }

  // ปุ่ม Post-test
  const btnPost = document.getElementById('btn-post');
  if (btnPost) {
    btnPost.onclick = () => startQuiz('post');
  }

  // Theme toggle — home
  const btnTheme = document.getElementById('btn-theme');
  if (btnTheme) {
    btnTheme.onclick = toggleTheme;
  }

  // Reset ข้อมูล
  const btnReset = document.getElementById('btn-reset');
  if (btnReset) {
    btnReset.onclick = () => {
      if (confirm('⚠️ คุณต้องการลบผลการทดสอบทั้งหมดใช่หรือไม่?')) {
        localStorage.removeItem('sfmq_result_pre');
        localStorage.removeItem('sfmq_result_post');
        localStorage.removeItem('sfmq_name');
        renderHistoryCards();
        showToast('🗑️ ล้างข้อมูลเรียบร้อยแล้ว');
      }
    };
  }

  // Name input — บันทึกอัตโนมัติ
  const inputName = document.getElementById('input-name');
  if (inputName) {
    inputName.oninput = () => {
      state.name = inputName.value.trim();
      saveLS('name', state.name);
    };
  }
}

/* =====================================================
   SECTION 5: QUIZ LOGIC
   ===================================================== */

/** เริ่มทำแบบทดสอบ */
function startQuiz(mode) {
  state.mode         = mode;
  state.questions    = shuffle(QUIZ_DATA);
  state.currentIndex = 0;
  state.answers      = [];
  state.answered     = false;

  // อ่านชื่อจาก input
  const inputEl = document.getElementById('input-name');
  if (inputEl) {
    state.name = inputEl.value.trim();
    saveLS('name', state.name);
  }

  goScreen('quiz');
  bindQuizHeaderEvents();
  renderQuestion();
}

/** Render คำถามปัจจุบัน */
function renderQuestion() {
  const q          = state.questions[state.currentIndex];
  const total      = state.questions.length;
  const idx        = state.currentIndex;
  const pct        = Math.round(((idx) / total) * 100);
  const modeLabel  = state.mode === 'pre' ? 'Pre-test' : 'Post-test';
  const modeCls    = state.mode === 'pre' ? 'pre' : 'post';

  // อัพเดท header
  const modeBadge  = document.getElementById('mode-badge');
  const progText   = document.getElementById('quiz-progress-text');
  const progFill   = document.getElementById('progress-fill');

  if (modeBadge) { modeBadge.textContent = modeLabel; modeBadge.className = 'mode-badge ' + modeCls; }
  if (progText)  progText.textContent = `ข้อที่ ${idx + 1} จาก ${total}`;
  if (progFill)  progFill.style.width = pct + '%';

  // Render คำถาม + ตัวเลือก
  const main = document.getElementById('quiz-main');
  if (!main) return;

  main.innerHTML = `
    <!-- Question Card -->
    <div class="glass-card question-card">
      <div class="q-number-badge">📋 ข้อที่ ${idx + 1}</div>
      <p class="q-text">${q.question}</p>
    </div>

    <!-- Options -->
    <div class="options-list" id="options-list">
      ${q.options.map((opt, i) => `
        <button
          class="option-btn"
          data-index="${i}"
          aria-label="ตัวเลือก ${opt.label}: ${opt.text}"
        >
          <span class="option-label">${opt.label}</span>
          <span class="option-text">${opt.text}</span>
        </button>
      `).join('')}
    </div>
  `;

  // Bind ตัวเลือก
  main.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.answered) return; // ห้ามเลือกซ้ำ
      selectAnswer(parseInt(btn.dataset.index));
    });
  });

  state.answered = false;
}

/** เมื่อผู้ใช้เลือกคำตอบ */
function selectAnswer(selectedIndex) {
  state.answered = true;
  const q       = state.questions[state.currentIndex];
  const correct = selectedIndex === q.correctIndex;

  // บันทึกคำตอบ
  state.answers.push({
    questionId:    q.id,
    selectedIndex: selectedIndex,
    correct:       correct,
  });

  // อัพเดท UI ตัวเลือก
  const optionBtns = document.querySelectorAll('.option-btn');
  optionBtns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correctIndex) {
      btn.classList.add('correct');
      btn.insertAdjacentHTML('beforeend', '<span class="option-result-icon">✅</span>');
    } else if (i === selectedIndex && !correct) {
      btn.classList.add('wrong');
      btn.insertAdjacentHTML('beforeend', '<span class="option-result-icon">❌</span>');
    } else {
      btn.classList.add('dimmed');
    }
  });

  // Feedback Banner
  const feedbackHTML = `
    <div class="feedback-banner ${correct ? 'correct-fb' : 'wrong-fb'}">
      <span class="feedback-icon">${correct ? '🎉' : '😔'}</span>
      <span>${correct ? 'ถูกต้อง! ยอดเยี่ยม' : 'ไม่ถูกต้อง กรุณาอ่านคำอธิบาย'}</span>
    </div>
  `;

  // Explanations — แสดงทุกตัวเลือก
  const explanationsHTML = `
    <div class="explanations-wrap">
      <p style="font-size:0.82rem;font-weight:700;color:var(--text-muted);margin-bottom:4px;">💡 คำอธิบาย</p>
      ${q.options.map((opt, i) => `
        <div class="explanation-item ${i === q.correctIndex ? 'correct-exp' : ''}">
          <div class="explanation-header">
            <span class="exp-label">${opt.label}</span>
            <span class="exp-option-text">${opt.text}</span>
            ${i === q.correctIndex ? '<span style="font-size:14px;">✅</span>' : ''}
          </div>
          <p class="exp-desc">${opt.explanation}</p>
        </div>
      `).join('')}
    </div>
  `;

  // Next / Finish Button
  const isLast    = state.currentIndex === state.questions.length - 1;
  const nextBtnHTML = `
    <div class="next-btn-wrap">
      <button class="btn-next" id="btn-next">
        ${isLast ? '🏁 ดูผลคะแนน' : 'ข้อถัดไป →'}
      </button>
    </div>
  `;

  // Append ทั้งหมดลงใน main
  const main = document.getElementById('quiz-main');
  main.insertAdjacentHTML('beforeend', feedbackHTML + explanationsHTML + nextBtnHTML);

  // อัพเดท Progress Bar หลังตอบ
  const pct = Math.round(((state.currentIndex + 1) / state.questions.length) * 100);
  const progFill = document.getElementById('progress-fill');
  if (progFill) progFill.style.width = pct + '%';

  // Bind Next button
  document.getElementById('btn-next').onclick = isLast ? finishQuiz : nextQuestion;

  // Auto scroll ไปยัง feedback
  setTimeout(() => {
    const fb = document.querySelector('.feedback-banner');
    if (fb) fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

/** ไปข้อถัดไป */
function nextQuestion() {
  state.currentIndex++;
  state.answered = false;
  renderQuestion();
  // Scroll กลับขึ้น
  const quizScreen = document.getElementById('screen-quiz');
  if (quizScreen) quizScreen.scrollTop = 0;
}

/** จบการทดสอบ — ไปหน้าผล */
function finishQuiz() {
  const score = state.answers.filter(a => a.correct).length;
  const total = state.questions.length;
  const pct   = Math.round((score / total) * 100);
  const now   = new Date();

  // บันทึกลง localStorage
  const resultData = {
    score:    score,
    total:    total,
    pct:      pct,
    mode:     state.mode,
    name:     state.name,
    date:     formatDate(now),
    dateISO:  now.toISOString(),
    answers:  state.answers,
  };
  saveLS('result_' + state.mode, resultData);

  goScreen('result');
  renderResult(resultData);
}

/** Bind events ใน Quiz header */
function bindQuizHeaderEvents() {
  const btnHome = document.getElementById('btn-quiz-home');
  if (btnHome) {
    btnHome.onclick = () => {
      if (confirm('ออกจากแบบทดสอบ? ผลการตอบที่ผ่านมาจะไม่ถูกบันทึก')) {
        goScreen('home');
        renderHome();
      }
    };
  }
  const btnTheme = document.getElementById('btn-quiz-theme');
  if (btnTheme) btnTheme.onclick = toggleTheme;
}

/* =====================================================
   SECTION 6: RESULT SCREEN
   ===================================================== */
function renderResult(data) {
  const grade = getGrade(data.score, data.total);
  const modeLabel = data.mode === 'pre' ? 'Pre-test' : 'Post-test';
  const modeCls   = data.mode === 'pre' ? 'pre' : 'post';

  // Result mode badge in header
  const resultModeBadge = document.getElementById('result-mode-badge');
  if (resultModeBadge) {
    resultModeBadge.textContent = modeLabel;
    resultModeBadge.className = 'mode-badge ' + modeCls;
  }

  // Build detail items
  const detailItems = state.questions.map((q, qi) => {
    const ans    = state.answers.find(a => a.questionId === q.id);
    const isCorr = ans && ans.correct;
    const selOpt = ans ? q.options[ans.selectedIndex] : null;
    const corrOpt = q.options[q.correctIndex];

    return `
      <div class="detail-item ${isCorr ? 'correct-item' : 'wrong-item'}" style="animation-delay:${qi * 0.04}s">
        <div class="detail-num ${isCorr ? 'c' : 'w'}">${qi + 1}</div>
        <div class="detail-body">
          <div class="detail-q">${q.question.length > 80 ? q.question.slice(0, 80) + '…' : q.question}</div>
          <div class="detail-ans">
            ${isCorr
              ? `✅ คำตอบถูก: ${corrOpt.label}. ${corrOpt.text}`
              : `❌ เลือก: ${selOpt ? selOpt.label + '. ' + selOpt.text : '—'} | ✅ ถูกคือ: ${corrOpt.label}. ${corrOpt.text}`
            }
          </div>
        </div>
        <span class="detail-icon">${isCorr ? '✅' : '❌'}</span>
      </div>
    `;
  }).join('');

  const main = document.getElementById('result-main');
  if (!main) return;

  main.innerHTML = `
    <!-- Score Card -->
    <div class="glass-card score-card">
      <div class="score-emoji">${grade.emoji}</div>
      <div class="score-number">${data.score}<span class="score-denom">/${data.total}</span></div>
      <span class="score-percent ${grade.cls}">${data.pct}%</span>
      <span class="grade-tag ${grade.cls}">${grade.label}</span>
      <p class="score-summary">${grade.summary}</p>
    </div>

    <!-- Info Row -->
    <div class="result-info-row">
      <div class="result-info-chip">
        <span>${data.mode === 'pre' ? '📝' : '🎯'}</span>
        <span>${modeLabel}</span>
      </div>
      ${data.name ? `<div class="result-info-chip"><span>👤</span><span>${data.name}</span></div>` : ''}
      <div class="result-info-chip"><span>📅</span><span>${data.date}</span></div>
    </div>

    <!-- Action Buttons -->
    <div class="result-actions">
      <button class="btn-capture" id="btn-capture">
        <span>📸</span>
        <span>
          บันทึกภาพผลคะแนน
          <span class="btn-capture-sub">เก็บเป็นหลักฐาน PNG</span>
        </span>
      </button>
      <div class="result-secondary-btns">
        <button class="btn-outline" id="btn-retake">
          🔄 ทดสอบใหม่
        </button>
        <button class="btn-outline" id="btn-go-home">
          🏠 หน้าหลัก
        </button>
      </div>
    </div>

    <!-- Detail Section -->
    <div class="detail-section">
      <h3 class="section-title" style="margin-bottom:4px;">📋 รายละเอียดทุกข้อ</h3>
      ${detailItems}
    </div>
  `;

  // Bind events
  document.getElementById('btn-capture').onclick = () => generateAndShowCertificate(data);
  document.getElementById('btn-retake').onclick  = () => startQuiz(state.mode);
  document.getElementById('btn-go-home').onclick = () => { goScreen('home'); renderHome(); };

  // Result theme + home buttons in header
  const btnResultHome  = document.getElementById('btn-result-home');
  const btnResultTheme = document.getElementById('btn-result-theme');
  if (btnResultHome)  btnResultHome.onclick  = () => { goScreen('home'); renderHome(); };
  if (btnResultTheme) btnResultTheme.onclick = toggleTheme;
}

/* =====================================================
   SECTION 7: CANVAS — สร้างภาพใบรับรองผลคะแนน
   ===================================================== */

/** สร้าง Canvas certificate และแสดง Modal */
async function generateAndShowCertificate(data) {
  const btn = document.getElementById('btn-capture');
  if (btn) { btn.textContent = '⏳ กำลังสร้างภาพ...'; btn.disabled = true; }

  try {
    await document.fonts.ready; // รอให้ fonts โหลดครบ
    drawCertificate(data);

    // แสดง Modal
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
    }
  } catch (e) {
    showToast('❌ ไม่สามารถสร้างภาพได้ กรุณาลองใหม่');
    console.error(e);
  } finally {
    if (btn) { btn.innerHTML = '<span>📸</span> <span>บันทึกภาพผลคะแนน<span class="btn-capture-sub">เก็บเป็นหลักฐาน PNG</span></span>'; btn.disabled = false; }
  }
}

/** วาด Certificate บน Canvas */
function drawCertificate(data) {
  const canvas  = document.getElementById('result-canvas');
  const W       = 800;
  const H       = 1100;
  canvas.width  = W;
  canvas.height = H;
  const ctx     = canvas.getContext('2d');
  const grade   = getGrade(data.score, data.total);
  const isDark  = state.theme === 'dark';

  /* ── Background Gradient ──────────────────────── */
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  if (isDark) {
    bgGrad.addColorStop(0,   '#0d0d2e');
    bgGrad.addColorStop(0.5, '#1a1040');
    bgGrad.addColorStop(1,   '#0d1e2e');
  } else {
    bgGrad.addColorStop(0,   '#e8f4ff');
    bgGrad.addColorStop(0.5, '#f0e8ff');
    bgGrad.addColorStop(1,   '#e8fff5');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  /* ── Decorative top accent bar ─────────────────── */
  const accentGrad = ctx.createLinearGradient(0, 0, W, 0);
  accentGrad.addColorStop(0,   '#0071E3');
  accentGrad.addColorStop(0.5, '#7367F0');
  accentGrad.addColorStop(1,   '#28C76F');
  ctx.fillStyle = accentGrad;
  ctx.fillRect(0, 0, W, 6);

  /* ── White/Dark card background ────────────────── */
  const cardX = 40, cardY = 30, cardW = W - 80, cardH = H - 60;
  roundRect(ctx, cardX, cardY, cardW, cardH, 28);
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.88)';
  ctx.fill();
  ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.95)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  /* ── Header Section ────────────────────────────── */
  const textColor   = isDark ? '#f0f0fc' : '#0d0d1e';
  const mutedColor  = isDark ? '#9090c0' : '#6060a0';
  const accentColor = '#0071E3';

  // Factory icon
  ctx.font = '42px Sarabun, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🏭', W / 2, 110);

  // App Title
  ctx.font = 'bold 22px Kanit, sans-serif';
  ctx.fillStyle = textColor;
  ctx.fillText('Shopfloor Management Quiz', W / 2, 152);

  // Subtitle
  ctx.font = '500 14px Sarabun, sans-serif';
  ctx.fillStyle = mutedColor;
  ctx.fillText('ใบรับรองผลการทดสอบความรู้การจัดการหน้างาน', W / 2, 174);

  /* ── Divider ────────────────────────────────────── */
  drawDivider(ctx, cardX + 40, 190, cardW - 80, isDark);

  /* ── Test Type Badge ────────────────────────────── */
  const modeLabel = data.mode === 'pre' ? 'Pre-test (ก่อนอบรม)' : 'Post-test (หลังอบรม)';
  const modeBgColor = data.mode === 'pre' ? '#FF9F43' : '#0071E3';
  drawBadge(ctx, W / 2, 224, modeLabel, '#ffffff', modeBgColor);

  /* ── Score Circle ──────────────────────────────── */
  const cx = W / 2, cy = 340, r = 90;

  // Outer ring gradient
  const ringGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  ringGrad.addColorStop(0, accentColor);
  ringGrad.addColorStop(1, '#7367F0');
  ctx.strokeStyle = ringGrad;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // Inner fill
  ctx.fillStyle = isDark ? 'rgba(0,113,227,0.12)' : 'rgba(0,113,227,0.07)';
  ctx.beginPath();
  ctx.arc(cx, cy, r - 4, 0, Math.PI * 2);
  ctx.fill();

  // Score number
  ctx.font = 'bold 58px Kanit, sans-serif';
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.fillText(data.score, cx, cy + 12);

  // "/ 10" label
  ctx.font = '500 18px Sarabun, sans-serif';
  ctx.fillStyle = mutedColor;
  ctx.fillText(`/ ${data.total} ข้อ`, cx, cy + 36);

  // Percentage below circle
  ctx.font = 'bold 20px Kanit, sans-serif';
  ctx.fillStyle = accentColor;
  ctx.fillText(data.pct + '%', cx, cy + r + 30);

  /* ── Grade Badge ────────────────────────────────── */
  const gradeColors = {
    'grade-excellent': '#28C76F',
    'grade-good':      '#0071E3',
    'grade-pass':      '#FF9F43',
    'grade-fail':      '#EA5455',
  };
  const gradeColor = gradeColors[grade.cls] || accentColor;
  drawBadge(ctx, W / 2, cy + r + 66, `${grade.emoji}  ${grade.label}`, gradeColor, gradeColor + '22', true);

  /* ── Info Section ───────────────────────────────── */
  let infoY = 508;
  drawDivider(ctx, cardX + 40, infoY, cardW - 80, isDark);
  infoY += 22;

  const infoItems = [];
  if (data.name)  infoItems.push({ icon: '👤', label: 'ชื่อผู้สอบ', value: data.name });
  infoItems.push({ icon: '📅', label: 'วันที่ทดสอบ', value: data.date });
  infoItems.push({ icon: '📊', label: 'คะแนน',       value: `${data.score}/${data.total} (${data.pct}%)` });
  infoItems.push({ icon: '🏅', label: 'ระดับ',        value: grade.label });

  infoItems.forEach((item, i) => {
    const rowY = infoY + (i * 38);
    // Icon
    ctx.font = '16px Sarabun, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = textColor;
    ctx.fillText(item.icon, cardX + 60, rowY);
    // Label
    ctx.font = '500 13px Sarabun, sans-serif';
    ctx.fillStyle = mutedColor;
    ctx.fillText(item.label, cardX + 90, rowY);
    // Value
    ctx.font = '600 14px Kanit, sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'right';
    ctx.fillText(item.value, cardX + cardW - 60, rowY);
  });

  /* ── Q&A Grid (10 dots) ─────────────────────────── */
  const gridY = infoY + (infoItems.length * 38) + 20;
  drawDivider(ctx, cardX + 40, gridY, cardW - 80, isDark);

  ctx.font = '700 13px Kanit, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillStyle = mutedColor;
  ctx.fillText('📋  ผลรายข้อ', cardX + 60, gridY + 26);

  const dotSize = 42;
  const dotGap  = 12;
  const dotsPerRow = 5;
  const gridStartX = (W - (dotsPerRow * dotSize + (dotsPerRow - 1) * dotGap)) / 2;
  const gridStartY = gridY + 44;

  state.answers.forEach((ans, i) => {
    const col = i % dotsPerRow;
    const row = Math.floor(i / dotsPerRow);
    const x   = gridStartX + col * (dotSize + dotGap) + dotSize / 2;
    const y   = gridStartY + row * (dotSize + dotGap + 10) + dotSize / 2;

    // Dot background
    ctx.fillStyle = ans.correct
      ? (isDark ? 'rgba(40,199,111,0.25)' : 'rgba(40,199,111,0.18)')
      : (isDark ? 'rgba(234,84,85,0.25)'  : 'rgba(234,84,85,0.18)');
    ctx.beginPath();
    ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Dot border
    ctx.strokeStyle = ans.correct ? '#28C76F' : '#EA5455';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Number
    ctx.font = 'bold 14px Kanit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = ans.correct ? '#28C76F' : '#EA5455';
    ctx.fillText(i + 1, x, y + 5);
  });

  /* ── Footer ─────────────────────────────────────── */
  const footerY = H - 70;
  drawDivider(ctx, cardX + 40, footerY, cardW - 80, isDark);

  ctx.font = '500 12px Sarabun, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = mutedColor;
  ctx.fillText('Shopfloor Management Training Program  •  เอกสารนี้สร้างโดยระบบอัตโนมัติ', W / 2, footerY + 20);
  ctx.fillText(`สร้างเมื่อ: ${data.date}`, W / 2, footerY + 38);
}

/* ── Canvas Helper: Rounded Rectangle ──────────────── */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ── Canvas Helper: Divider ─────────────────────────── */
function drawDivider(ctx, x, y, w, isDark) {
  ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.stroke();
}

/* ── Canvas Helper: Badge ──────────────────────────── */
function drawBadge(ctx, cx, cy, text, color, bg, bordered = false) {
  ctx.font = '700 14px Kanit, sans-serif';
  ctx.textAlign = 'center';
  const tw  = ctx.measureText(text).width;
  const padX = 24, padY = 10;
  const bx = cx - tw / 2 - padX;
  const by = cy - padY - 6;
  const bw = tw + padX * 2;
  const bh = padY * 2 + 4;

  roundRect(ctx, bx, by, bw, bh, bh / 2);
  ctx.fillStyle = bg;
  ctx.fill();

  if (bordered) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.fillStyle = bordered ? color : '#ffffff';
  ctx.fillText(text, cx, cy);
}

/* =====================================================
   SECTION 8: MODAL EVENTS
   ===================================================== */
function bindModalEvents() {
  // Close buttons
  ['btn-modal-close', 'btn-modal-close2'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.onclick = closeModal;
  });

  // Click overlay to close
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.onclick = (e) => {
      if (e.target === overlay) closeModal();
    };
  }

  // Download button
  const btnDownload = document.getElementById('btn-download');
  if (btnDownload) {
    btnDownload.onclick = downloadCertificate;
  }
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  }
}

function downloadCertificate() {
  const canvas = document.getElementById('result-canvas');
  if (!canvas) return;

  try {
    const link    = document.createElement('a');
    link.download = buildFilename();
    link.href     = canvas.toDataURL('image/png');
    link.click();
    showToast('✅ บันทึกภาพสำเร็จ!');
    closeModal();
  } catch (e) {
    showToast('❌ ไม่สามารถบันทึกภาพได้');
    console.error(e);
  }
}

/* =====================================================
   SECTION 9: INITIALIZATION
   ===================================================== */
function init() {
  // โหลด theme ที่บันทึกไว้
  const savedTheme = loadLS('theme') || 'light';
  state.theme = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Loading animation
  const bar = document.getElementById('loading-bar-fill');
  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 25 + 10;
    if (bar) bar.style.width = Math.min(progress, 92) + '%';
    if (progress >= 92) {
      clearInterval(loadInterval);
      // เสร็จแล้ว → ไปหน้า Home
      setTimeout(() => {
        if (bar) bar.style.width = '100%';
        setTimeout(() => {
          goScreen('home');
          renderHome();
          syncThemeIcons();
        }, 300);
      }, 300);
    }
  }, 180);

  // Bind modal events
  bindModalEvents();

  // ป้องกัน double-tap zoom บน iOS
  document.addEventListener('touchend', (e) => {
    if (e.target.tagName === 'BUTTON') e.preventDefault();
  }, { passive: false });
}

// เริ่มต้นแอพ
init();
