// --- 1. SET UP FIREBASE (คงเดิม เพราะโหลดหน้า Home ขึ้นแล้ว) ---
const firebaseConfig = {
  apiKey: "AIzaSyD3orpyGLBOGgLR6M0uPEz9m5xwu0kVOW0",
  authDomain: "quiz-f5784.firebaseapp.com",
  projectId: "quiz-f5784",
  storageBucket: "quiz-f5784.firebasestorage.app",
  messagingSenderId: "270398181695",
  appId: "1:270398181695:web:54bc6e1c184085c2f1838a",
  measurementId: "G-N3W77HM1D6"
};

// ตรวจสอบก่อน initialize เพื่อไม่ให้รันซ้ำเวลา Refresh หน้าจอ
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// --- 2. ฟังก์ชันจัดการข้อมูล ---

async function saveToFirebase(mode, data) {
    console.log("กำลังพยายามส่งข้อมูลไป Firebase...", mode, data);
    
    // 1. ดึงชื่อพนักงาน (ลองดึงจาก state ถ้าไม่มีให้ดึงจาก LocalStorage)
    let employeeName = (window.state && state.name) ? state.name : localStorage.getItem('sfmq_name');

    // 2. ถ้ายังไม่เจอชื่ออีก ให้หยุดการทำงาน
    if (!employeeName) {
        alert("❌ หาชื่อพนักงานไม่เจอ! โปรดระบุชื่อในหน้าแรกก่อนเริ่มทำแบบทดสอบ");
        console.error("No employee name found in state or localStorage");
        return;
    }

    try {
        // 3. ส่งข้อมูลโดยใช้ชื่อที่ดึงมาได้
        await db.collection("results").doc(`${employeeName}_${mode}`).set({
            name: employeeName,
            mode: mode,
            score: data.score,
            total: data.total,
            details: data.details || [],
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        console.log(`✅ บันทึกผลของคุณ ${employeeName} เรียบร้อย!`);
    } catch (e) {
        console.error("Firebase Error Details:", e);
        alert("❌ ส่งไม่สำเร็จ: " + e.message);
    }
}

async function loadFromFirebase(mode) {
  // 1. เช็คชื่อพนักงานจาก state หรือ localStorage
  const name = state.name || localStorage.getItem('sfmq_name');
  if (!name) return null;

  try {
    // 🔥 จุดแก้ไขสำคัญ: ต้องระบุชื่อ Document ให้ตรงกับตอน Save (คือ ชื่อ_โหมด)
    const docId = `${name}_${mode}`; 
    console.log(`🔍 กำลังค้นหาข้อมูลจาก ID: ${docId}`);

    const doc = await db.collection("results").doc(docId).get();

    if (doc.exists) {
      console.log(`✅ พบข้อมูลสำหรับ ${docId}`);
      return doc.data();
    } else {
      console.log(`❓ ไม่พบข้อมูลสำหรับ ${docId}`);
      return null;
    }
  } catch (e) {
    console.error("❌ Firebase Load Error:", e);
    return null;
  }
}

'use strict';
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
  
  // ✅ แก้ไข: ให้ดึงชื่อเดิมที่เคยพิมพ์ไว้จากเครื่องมาใส่ทันที
  name: localStorage.getItem('sfmq_name') || '', 
  
  questions: [],            // shuffled questions array
  currentIndex: 0,          // index ข้อปัจจุบัน
  answers: [],              // [{questionId, selectedIndex, correct}]
  answered: false,          // ตอบข้อนี้แล้วหรือยัง
  
  // ✅ แก้ไข: ให้จำโหมดมืด/สว่างจากที่เคยเลือกไว้
  theme: localStorage.getItem('sfmq_theme') || 'light', 
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


/** แสดงผลวันที่ไทย - ปรับให้รองรับ Firebase Timestamp */
function formatDate(d = new Date()) {
  // ตรวจสอบว่า d เป็น Firebase Timestamp หรือไม่ (ถ้ามีเมธอด toDate แสดงว่าเป็นของ Firebase)
  let dateObj = d;
  if (d && typeof d.toDate === 'function') {
    dateObj = d.toDate();
  } else if (!(d instanceof Date)) {
    dateObj = new Date(d); // เผื่อกรณีส่งเป็น String หรือตัวเลขเข้ามา
  }

  // ป้องกันกรณีวันที่ Error/Invalid
  if (isNaN(dateObj.getTime())) return 'ไม่ระบุวันที่';

  const y = dateObj.getFullYear() + 543; // พ.ศ.
  const mo = String(dateObj.getMonth() + 1).padStart(2, '0');
  const da = String(dateObj.getDate()).padStart(2, '0');
  const h  = String(dateObj.getHours()).padStart(2, '0');
  const mi = String(dateObj.getMinutes()).padStart(2, '0');
  return `${da}/${mo}/${y} เวลา ${h}:${mi} น.`;
}

/** ชื่อไฟล์สำหรับบันทึกภาพ — เพิ่มการเช็คตัวหารไม่ให้เป็น 0 */
function buildFilename() {
  const d = new Date();
  const dateStr = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
  
  const score = state.answers ? state.answers.filter(a => a.correct).length : 0;
  
  // ✅ ป้องกัน Division by zero: ถ้ายังไม่มีคำถาม ให้เปอร์เซ็นต์เป็น 0
  const qCount = state.questions.length || 1; 
  const pct = Math.round((score / qCount) * 100);
  
  const modeStr = state.mode === 'pre' ? 'PreTest' : 'PostTest';
  
  // ✅ ล้างชื่อพนักงานเล็กน้อยเผื่อมีอักขระพิเศษที่ไฟล์ระบบไม่รองรับ
  const safeName = state.name ? state.name.replace(/[^a-zA-Z0-9ก-ฮ]/g, '') : 'User';
  
  return `Shopfloor_Quiz_${modeStr}_${safeName}_${pct}pct_${dateStr}.png`;
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

/** สลับหน้า (Screen) — เพิ่มระบบป้องกันการหาหน้าจอไม่พบ */
async function goScreen(name) { // 1. เพิ่ม async ตรงนี้
  // ซ่อนทุกหน้า
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

  const screenId = 'screen-' + name;
  const el = document.getElementById(screenId);
  
  if (el) {
    el.classList.add('active');
    el.scrollTop = 0;
    state.screen = name; 
    
    // 🚩 จุดสำคัญ: ถ้ากลับมาหน้า Home ให้สั่ง Render ใหม่
    if (name === 'home') {
      console.log("🔄 Returning Home: Refreshing data...");
      await renderHome(); // 2. เพิ่มการรอ renderHome ตรงนี้
    }
    
    if (typeof syncThemeIcons === 'function') syncThemeIcons();
    console.log(`🚀 Switched to screen: ${name}`);
  } else {
    console.error(`❌ Missing screen: ${screenId}`);
    if (name !== 'home') goScreen('home');
  }
}

/** Sync theme toggle icons ทุกปุ่ม */
function syncThemeIcons() {
  const icons = document.querySelectorAll('.theme-icon');
  if (icons.length === 0) return; // ป้องกัน Error ถ้าหา Element ไม่เจอ

  icons.forEach(icon => {
    // ใช้ innerHTML หรือ textContent ตามความเหมาะสม
    icon.textContent = state.theme === 'dark' ? '🌙' : '☀️';
  });
}

/** Toggle Dark/Light mode */
function toggleTheme() {
  // 1. สลับค่าใน State
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  
  // 2. อัปเดต UI (CSS Variables)
  document.documentElement.setAttribute('data-theme', state.theme);
  
  // 3. บันทึกลง LocalStorage (ใช้คำสั่งมาตรฐานแทน saveLS เดิม)
  localStorage.setItem('sfmq_theme', state.theme);
  
  // 4. เปลี่ยนไอคอนทุกจุดในหน้าจอ
  syncThemeIcons();
  
  console.log(`🌓 Theme changed to: ${state.theme}`);
}

/* =====================================================
   SECTION 4: HOME SCREEN
   ===================================================== */
/* =====================================================
   RENDER HOME (ฉบับปรับปรุง)
   ===================================================== */
async function renderHome() { // เพิ่ม async
  console.log("🏠 เริ่มวาดหน้า Home...");

  // 1. ใส่ชื่อในช่อง Input
  const inputEl = document.getElementById('input-name');
  if (inputEl) {
    inputEl.value = state.name || '';
  }

  // 2. แสดงประวัติคะแนน (ใส่ await เพื่อให้วาดการ์ดเสร็จก่อนไปต่อ)
  if (typeof renderHistoryCards === 'function') {
    await renderHistoryCards(); 
  }

  // 3. ผูกคำสั่งปุ่ม (ต้องรอดึงข้อมูล Firebase จบก่อน เพื่อให้ปุ่มจาง/เข้ม ได้ถูกต้อง)
  if (typeof bindHomeEvents === 'function') {
    await bindHomeEvents();
  }
  
  console.log("🏠 วาดหน้า Home สำเร็จสำหรับ:", state.name);
}

/* =====================================================
   RENDER HISTORY CARDS
   ===================================================== */
async function renderHistoryCards() {
  const container = document.getElementById('history-cards');
  if (!container) return;

  // 1. ระหว่างรอข้อมูล
  container.innerHTML = '<p style="text-align:center; opacity:0.6;">กำลังโหลดประวัติ...</p>';

  try {
    // 2. ดึงข้อมูลจาก Firebase (ใช้ Promise.all เพื่อความเร็ว ดึงคู่ไปเลย)
    const [preData, postData] = await Promise.all([
      loadFromFirebase('pre'),
      loadFromFirebase('post')
    ]);

    // 3. วาดการ์ดประวัติ
    container.innerHTML = '';
    
    // ถ้าไม่มีข้อมูลเลยทั้งคู่
    if (!preData && !postData) {
      container.innerHTML = '<p style="text-align:center; opacity:0.5;">ยังไม่มีประวัติการทดสอบ</p>';
      return;
    }

    // เรียกฟังก์ชันสร้าง Element การ์ด (ตรวจสอบชื่อฟังก์ชัน buildHistoryCard ว่ามีอยู่จริง)
    if (preData) {
        container.appendChild(buildHistoryCard('Pre-test', 'pre', preData));
    }
    if (postData) {
        container.appendChild(buildHistoryCard('Post-test', 'post', postData));
    }
    
  } catch (e) {
    console.error("❌ Render History Error:", e);
    container.innerHTML = '<p style="color:red; text-align:center;">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>';
  }
}

function buildHistoryCard(label, mode, data) {
  const div = document.createElement('div');
  div.className = 'history-card' + (data ? '' : ' empty');

  if (data) {
    // 1. คำนวณเปอร์เซ็นต์ (ป้องกันตัวหารเป็น 0)
    const total = data.total || 10; // ถ้าไม่มีค่า total ให้ default เป็น 10 ตามจำนวนข้อสอบ
    const pct = Math.round((data.score / total) * 100);

    // 2. จัดการวันที่ (Firebase Timestamp -> Thai Date)
    // ใช้ฟังก์ชัน formatDate ที่เราเตรียมไว้ใน Section 3
    let displayDate = 'ไม่ระบุวันที่';
    if (data.timestamp) {
      displayDate = formatDate(data.timestamp); 
    } else if (data.date) {
      displayDate = data.date; // เผื่อกรณีข้อมูลเก่าใน LocalStorage
    }

    div.innerHTML = `
      <span class="hcard-badge ${mode}">${label}</span>
      <div class="hcard-score">${data.score}<span>/${total}</span></div>
      <div class="hcard-pct">${pct}%</div>
      <div class="hcard-date">📅 ${displayDate}</div>
    `;
  } else {
    div.innerHTML = `
      <span class="hcard-badge ${mode}">${label}</span>
      <div class="hcard-empty">ยังไม่มีผล<br/>การทดสอบ</div>
    `;
  }
  return div;
}

async function bindHomeEvents() {
  // 1. ดึงข้อมูลจาก Firebase (ใช้ตัวที่เราเตรียมไว้)
  // เราดึงมาเตรียมไว้ก่อนเพื่อให้ปุ่มแสดงสถานะ (จาง/ชัด) ได้ทันที
  const preData = await loadFromFirebase('pre');
  const postData = await loadFromFirebase('post');

  // ฟังก์ชันช่วยจัดการ Event (ปรับให้เรียบง่ายและไม่ Crash)
  const setButtonClick = (id, callback) => {
    const el = document.getElementById(id);
    if (!el) return;
    
    // ใช้ onclick ตรงๆ จะเสถียรที่สุดในการเขียนแอปแบบ Simple และป้องกัน Event ซ้อนได้ดีกว่า
    el.onclick = async (e) => {
      e.preventDefault();
      // เช็คชื่อก่อนเริ่มเสมอ
      if (!state.name || state.name.trim() === "") {
        if (typeof showToast === 'function') showToast('⚠️ กรุณาระบุชื่อพนักงานก่อน');
        return;
      }
      await callback();
    };
  };

  // 2. ปุ่ม Pre-test
  setButtonClick('btn-pre', async () => {
    // เช็คสดจาก Firebase อีกครั้งเพื่อความชัวร์
    const currentPre = await loadFromFirebase('pre');
    if (currentPre) {
      showToast('⚠️ คุณสอบ Pre-test ไปแล้ว');
    } else {
      startQuiz('pre');
    }
  });

  // 3. ปุ่ม Post-test
  setButtonClick('btn-post', async () => {
    const currentPost = await loadFromFirebase('post');
    if (currentPost) {
      showToast('⚠️ คุณสอบ Post-test ไปแล้ว');
    } else {
      startQuiz('post');
    }
  });

  // 4. จัดการสถานะปุ่ม (Visual Feedback)
  const btnPre = document.getElementById('btn-pre');
  const btnPost = document.getElementById('btn-post');
  
  if (btnPre && preData) {
    btnPre.style.opacity = "0.5";
    btnPre.classList.add('completed'); // เผื่อคุณมี CSS จัดการปุ่มที่สอบแล้ว
  }
  if (btnPost && postData) {
    btnPost.style.opacity = "0.5";
    btnPost.classList.add('completed');
  }

  // 5. Theme & Reset
  setButtonClick('btn-theme', toggleTheme);
  
  setButtonClick('btn-reset', () => {
    if (confirm('⚠️ ต้องการล้างข้อมูลทั้งหมด? (ประวัติใน Firebase จะไม่หาย แต่ชื่อในเครื่องจะถูกลบ)')) {
      localStorage.clear();
      window.location.reload();
    }
  });

  // 6. Name input - ใช้การบันทึกแบบมาตรฐาน
  const inputName = document.getElementById('input-name');
  if (inputName) {
    inputName.oninput = (e) => {
      state.name = e.target.value.trim();
      localStorage.setItem('sfmq_name', state.name);
    };
  }
}

//** เริ่มทำแบบทดสอบ - ปรับให้รองรับระบบ Firebase */
function startQuiz(mode) {
  // 1. ดักจับชื่อพนักงานให้ชัวร์ก่อนไปต่อ
  const inputEl = document.getElementById('input-name');
  const currentName = inputEl ? inputEl.value.trim() : state.name;

  if (!currentName) {
    if (typeof showToast === 'function') showToast('⚠️ กรุณาระบุชื่อพนักงานก่อนเริ่ม');
    // ไฮไลท์ช่องกรอกชื่อเพื่อให้พนักงานรู้ตัว
    if (inputEl) inputEl.focus();
    return;
  }

  // 2. อัปเดตสถานะและบันทึกลงเครื่อง
  state.name = currentName;
  state.mode = mode;
  state.currentIndex = 0;
  state.answers = [];
  state.answered = false;
  
  // ใช้คำสั่งมาตรฐานแทน saveLS
  localStorage.setItem('sfmq_name', state.name);

  // 3. เตรียมข้อสอบ (สุ่มลำดับ)
  if (typeof shuffle === 'function') {
    state.questions = shuffle(QUIZ_DATA);
  } else {
    state.questions = [...QUIZ_DATA]; // กันเหนียวถ้าหาฟังก์ชัน shuffle ไม่เจอ
  }

  // 4. เปลี่ยนหน้าจอ (สำคัญที่สุด)
  goScreen('quiz');
  
  // 5. วาดเนื้อหา (Render)
  if (typeof bindQuizHeaderEvents === 'function') bindQuizHeaderEvents();
  if (typeof renderQuestion === 'function') renderQuestion();
  
  console.log(`📝 Starting ${mode} test for: ${state.name}`);
}

/** Render คำถามปัจจุบัน — เพิ่มความแม่นยำของ Progress และความปลอดภัย */
function renderQuestion() {
  // 1. ตรวจสอบความปลอดภัยของข้อมูล
  if (!state.questions || state.questions.length === 0) {
    console.error("❌ ไม่พบข้อมูลคำถามใน state.questions");
    goScreen('home'); // ถ้าไม่มีข้อสอบให้ตีกลับหน้าโฮม
    return;
  }

  const q = state.questions[state.currentIndex];
  const total = state.questions.length;
  const idx = state.currentIndex;
  
  // ✅ ปรับ Progress ให้เป็นปัจจุบัน (ข้อที่ 1 จาก 10 ควรเห็นแถบขึ้นมาบ้าง)
  const pct = Math.round(((idx + 1) / total) * 100);
  
  const modeLabel = state.mode === 'pre' ? 'Pre-test' : 'Post-test';
  const modeCls = state.mode === 'pre' ? 'pre' : 'post';

  // 2. อัปเดต Header
  const modeBadge = document.getElementById('mode-badge');
  const progText = document.getElementById('quiz-progress-text');
  const progFill = document.getElementById('progress-fill');

  if (modeBadge) { 
    modeBadge.textContent = modeLabel; 
    modeBadge.className = 'mode-badge ' + modeCls; 
  }
  if (progText) progText.textContent = `ข้อที่ ${idx + 1} จาก ${total}`;
  if (progFill) {
    progFill.style.width = pct + '%';
    // เพิ่มสีสันให้ Progress Bar ตามโหมด
    progFill.style.backgroundColor = state.mode === 'pre' ? '#3b82f6' : '#10b981';
  }

  // 3. Render คำถาม + ตัวเลือก
  const main = document.getElementById('quiz-main');
  if (!main) return;

  // ใช้ template literal เดิมของคุณ (โครงสร้างดีอยู่แล้ว)
  main.innerHTML = `
    <div class="glass-card question-card">
      <div class="q-number-badge">📋 ข้อที่ ${idx + 1}</div>
      <p class="q-text">${q.question}</p>
    </div>

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

  // 4. ผูก Event Click (Bind)
  main.querySelectorAll('.option-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      if (state.answered) return; 
      
      // ล็อคทันทีที่กดเพื่อป้องกันการเบิ้ลปุ่ม
      state.answered = true; 
      
      // เพิ่มคลาส 'selected' เพื่อให้ผู้ใช้รู้ว่ากดติดแล้ว (Visual Feedback)
      btn.classList.add('selected');
      
      const selectedIdx = parseInt(btn.getAttribute('data-index'));
      
      // ส่งต่อไปยังฟังก์ชันตรวจคำตอบ
      if (typeof selectAnswer === 'function') {
        selectAnswer(selectedIdx);
      }
    };
  });

  // สำคัญ: ปลดล็อคสถานะ "ตอบแล้ว" สำหรับข้อถัดไป
  state.answered = false;
  
  // เลื่อนหน้าจอกลับไปบนสุดทุกครั้งที่เปลี่ยนข้อ
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** เมื่อผู้ใช้เลือกคำตอบ — ปรับจูนประสิทธิภาพและการเชื่อมต่อ */
function selectAnswer(selectedIndex) {
  state.answered = true;
  const q = state.questions[state.currentIndex];
  const correct = selectedIndex === q.correctIndex;

  // 1. บันทึกคำตอบลงใน State
  state.answers.push({
    questionId: q.id,
    selectedIndex: selectedIndex,
    correct: correct,
  });

  // 2. อัปเดต UI ตัวเลือก (ใช้คลาสสีเพื่อบอกใบ้)
  const optionBtns = document.querySelectorAll('.option-btn');
  optionBtns.forEach((btn, i) => {
    btn.disabled = true; // ล็อคปุ่มทันที
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

  // 3. เตรียม HTML ส่วนเสริม (Feedback + Explanations + Button)
  const isLast = state.currentIndex === state.questions.length - 1;
  
  const feedbackHTML = `
    <div class="feedback-banner ${correct ? 'correct-fb' : 'wrong-fb'}" id="feedback-anchor">
      <span class="feedback-icon">${correct ? '🎉' : '😔'}</span>
      <span>${correct ? 'ถูกต้อง! ยอดเยี่ยม' : 'ไม่ถูกต้อง ลองอ่านคำอธิบายด้านล่าง'}</span>
    </div>
  `;

  const explanationsHTML = `
    <div class="explanations-wrap">
      <p style="font-size:0.85rem; font-weight:700; color:var(--text-muted); margin-bottom:10px; display:flex; align-items:center; gap:5px;">
        <span style="font-size:1.1rem;">💡</span> คำอธิบายประกอบ
      </p>
      ${q.options.map((opt, i) => `
        <div class="explanation-item ${i === q.correctIndex ? 'correct-exp' : ''}">
          <div class="explanation-header">
            <span class="exp-label">${opt.label}</span>
            <span class="exp-option-text">${opt.text}</span>
            ${i === q.correctIndex ? '<span>✅</span>' : ''}
          </div>
          <p class="exp-desc">${opt.explanation}</p>
        </div>
      `).join('')}
    </div>
  `;

  const nextBtnHTML = `
    <div class="next-btn-wrap" style="padding-bottom: 40px;">
      <button class="btn-next" id="btn-next">
        ${isLast ? '🏁 สรุปผลการทดสอบ' : 'ทำข้อถัดไป →'}
      </button>
    </div>
  `;

  // 4. แสดงผลลงในหน้าจอ
  const main = document.getElementById('quiz-main');
  if (main) {
    main.insertAdjacentHTML('beforeend', feedbackHTML + explanationsHTML + nextBtnHTML);
  }

  // 5. ผูกคำสั่งปุ่มถัดไป (สำคัญมาก: ตรวจสอบชื่อฟังก์ชันให้ตรง)
  const nextBtn = document.getElementById('btn-next');
  if (nextBtn) {
    nextBtn.onclick = () => {
      // เลื่อนหน้าจอกลับไปบนสุดก่อนเปลี่ยนข้อ
      window.scrollTo(0, 0);
      if (isLast) {
        if (typeof finishQuiz === 'function') finishQuiz();
      } else {
        if (typeof nextQuestion === 'function') nextQuestion();
      }
    };
  }

  // 6. Smooth Scroll ไปยังจุดเฉลย (ปรับ Delay ให้เสถียรขึ้น)
  setTimeout(() => {
    const anchor = document.getElementById('feedback-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 150);
}

/** ไปข้อถัดไป — ปรับลำดับการทำงานให้ลื่นขึ้น */
function nextQuestion() {
  // 1. เพิ่ม Index
  state.currentIndex++;
  
  // 2. รีเซ็ตสถานะการตอบ
  state.answered = false;

  // 3. เลื่อนหน้าจอกลับขึ้นบนสุดทันที (ใช้ window.scrollTo จะเสถียรกว่าในหลาย Browser)
  window.scrollTo({ top: 0, behavior: 'instant' }); 
  
  const quizScreen = document.getElementById('screen-quiz');
  if (quizScreen) quizScreen.scrollTop = 0;

  // 4. วาดคำถามข้อใหม่
  if (typeof renderQuestion === 'function') {
    renderQuestion();
  }
  
  console.log(`➡️ Moving to question ${state.currentIndex + 1}`);
}


/** Section 6 (บันทึกข้อมูล) จบการทดสอบ — บันทึกข้อมูลขึ้น Firebase และไปหน้าสรุปผล */
async function finishQuiz() {
  // 1. คำนวณคะแนนพื้นฐาน
  const score = state.answers.filter(a => a.correct).length;
  const total = state.questions.length || 10;
  const pct   = Math.round((score / total) * 100);
  const now   = new Date();

  // 2. อัปเดต Global State (สำคัญมาก: เพื่อให้หน้า Result และ Canvas ดึงไปใช้ได้)
  state.score = score;
  state.total = total;
  state.pct   = pct;

  // 3. เตรียมชุดข้อมูล (Data Object)
  const resultData = {
    score: score,
    total: total,
    pct: pct,
    mode: state.mode,
    name: state.name,
    date: typeof formatDate === 'function' ? formatDate(now) : now.toLocaleDateString('th-TH'),
    details: state.answers, // ใช้ชื่อ 'details' ให้ตรงกับใน saveToFirebase
  };

  // แสดง Loading (ถ้ามี) เพื่อให้ User รู้ว่ากำลังบันทึก
  if (typeof showLoading === 'function') showLoading(true);

  try {
    // 4. บันทึกลง LocalStorage (กันเหนียว)
    localStorage.setItem(`sfmq_result_${state.mode}`, JSON.stringify(resultData));

    // 5. ส่งข้อมูลไป Firebase (ใช้ await เพื่อรอให้เสร็จชัวร์ๆ)
    await saveToFirebase(state.mode, resultData);
    
    console.log(`✅ บันทึกผล ${state.mode} สำเร็จ!`);
  } catch (e) {
    console.error("❌ บันทึกข้อมูลผิดพลาด:", e);
    if (typeof showToast === 'function') showToast('⚠️ บันทึกข้อมูลลง Cloud ไม่สำเร็จ แต่ออกใบเซอร์ได้');
  } finally {
    if (typeof showLoading === 'function') showLoading(false);
  }

  // 6. เปลี่ยนหน้าจอไปหน้าสรุปผล
  goScreen('result');

  // 7. วาดหน้าจอสรุปผล
  if (typeof renderResult === 'function') {
    renderResult(resultData);
  }
}

/** Bind events ใน Quiz header — ปรับให้ลื่นไหลและปลอดภัยขึ้น */
function bindQuizHeaderEvents() {
  // 1. ปุ่มกลับหน้าหลัก (Home)
  const btnHome = document.getElementById('btn-quiz-home');
  if (btnHome) {
    btnHome.onclick = (e) => {
      e.preventDefault();
      // ใช้ confirm เพื่อป้องกันพนักงานกดโดนโดยไม่ตั้งใจ
      if (confirm('⚠️ ออกจากแบบทดสอบ? \nคะแนนที่ทำค้างไว้จะไม่ถูกบันทึกจนกว่าจะสอบเสร็จ')) {
        
        // กลับหน้า Home
        goScreen('home');
        
        // เรียก renderHome เพื่อรีเฟรชข้อมูลชื่อและประวัติล่าสุด
        if (typeof renderHome === 'function') {
          renderHome();
        }
      }
    };
  }

  // 2. ปุ่มเปลี่ยนธีม (Theme)
  const btnTheme = document.getElementById('btn-quiz-theme');
  if (btnTheme) {
    btnTheme.onclick = (e) => {
      e.preventDefault();
      if (typeof toggleTheme === 'function') {
        toggleTheme();
      }
    };
  }
  
  // 3. ซิงค์ไอคอนธีมให้ตรงกับปัจจุบัน (กันเหนียว)
  if (typeof syncThemeIcons === 'function') {
    syncThemeIcons();
  }
}

function renderResult(data) {
  // 1. ตรวจสอบข้อมูลกัน Error
  if (!data || !state.questions || state.questions.length === 0) {
    console.error("❌ ข้อมูลไม่ครบถ้วนสำหรับการแสดงผล");
    goScreen('home');
    return;
  }

  const grade = typeof getGrade === 'function' ? getGrade(data.score, data.total) : { emoji: '📊', label: 'สรุปผล', cls: 'default', summary: '' };
  const modeLabel = data.mode === 'pre' ? 'Pre-test' : 'Post-test';
  const modeCls = data.mode === 'pre' ? 'pre' : 'post';

  // อัปเดต Badge ใน Header
  const resultModeBadge = document.getElementById('result-mode-badge');
  if (resultModeBadge) {
    resultModeBadge.textContent = modeLabel;
    resultModeBadge.className = 'mode-badge ' + modeCls;
  }

  // 2. สร้างรายการคำตอบ (Detail Items)
  const detailItems = state.questions.map((q, qi) => {
    const ans = state.answers ? state.answers.find(a => a.questionId === q.id) : null;
    const isCorr = ans && ans.correct;
    const selOpt = (ans && q.options) ? q.options[ans.selectedIndex] : null;
    const corrOpt = q.options ? q.options[q.correctIndex] : { label: '?', text: 'ไม่ระบุ' };

    return `
      <div class="detail-item ${isCorr ? 'correct-item' : 'wrong-item'}" style="animation-delay:${qi * 0.04}s">
        <div class="detail-num ${isCorr ? 'c' : 'w'}">${qi + 1}</div>
        <div class="detail-body">
          <div class="detail-q">${q.question.length > 80 ? q.question.slice(0, 80) + '…' : q.question}</div>
          <div class="detail-ans">
            ${isCorr
              ? `✅ ถูกต้อง: ${corrOpt.label}. ${corrOpt.text}`
              : `❌ เลือก: ${selOpt ? selOpt.label + '. ' + selOpt.text : 'ไม่ได้ตอบ'} | ✅ ที่ถูกคือ: ${corrOpt.label}. ${corrOpt.text}`
            }
          </div>
        </div>
        <span class="detail-icon">${isCorr ? '✅' : '❌'}</span>
      </div>
    `;
  }).join('');

  const main = document.getElementById('result-main');
  if (!main) return;

  // 3. วาด HTML (ใช้โครงสร้างเดิมแต่เพิ่มความปลอดภัย)
  main.innerHTML = `
    <div class="glass-card score-card">
      <div class="score-emoji">${grade.emoji}</div>
      <div class="score-number">${data.score}<span class="score-denom">/${data.total}</span></div>
      <span class="score-percent ${grade.cls}">${data.pct}%</span>
      <span class="grade-tag ${grade.cls}">${grade.label}</span>
      <p class="score-summary">${grade.summary}</p>
    </div>

    <div class="result-info-row">
      <div class="result-info-chip"><span>${data.mode === 'pre' ? '📝' : '🎯'}</span><span>${modeLabel}</span></div>
      ${data.name ? `<div class="result-info-chip"><span>👤</span><span>${data.name}</span></div>` : ''}
      <div class="result-info-chip"><span>📅</span><span>${data.date}</span></div>
    </div>

    <div class="result-actions">
      <button class="btn-capture" id="btn-capture">
        <span>📸</span>
        <span>บันทึกภาพผลคะแนน<span class="btn-capture-sub">เก็บเป็นหลักฐาน PNG</span></span>
      </button>
      <div class="result-secondary-btns">
        <button class="btn-outline" id="btn-retake">🔄 ทดสอบใหม่</button>
        <button class="btn-outline" id="btn-go-home">🏠 หน้าหลัก</button>
      </div>
    </div>

    <div class="detail-section">
      <h3 class="section-title">📋 รายละเอียดคำตอบ</h3>
      ${detailItems}
    </div>
  `;

  // 4. ผูกคำสั่งปุ่ม (Bind Events)
  const captureBtn = document.getElementById('btn-capture');
  if (captureBtn) {
    captureBtn.onclick = () => {
      captureBtn.disabled = true; // ป้องกันการกดซ้ำขณะประมวลผลภาพ
      generateAndShowCertificate(data);
      setTimeout(() => { captureBtn.disabled = false; }, 3000);
    };
  }

  document.getElementById('btn-retake').onclick = () => {
    const password = prompt("⚠️ ใส่รหัสผ่านเพื่อเริ่มใหม่ (เฉพาะเจ้าหน้าที่):");
    if (password === "QCO2026") {
      startQuiz(state.mode);
    } else if (password !== null) {
      alert("❌ รหัสผ่านไม่ถูกต้อง");
    }
  };

  const goHome = () => { goScreen('home'); renderHome(); };
  document.getElementById('btn-go-home').onclick = goHome;
  if (document.getElementById('btn-result-home')) document.getElementById('btn-result-home').onclick = goHome;
}

/* =====================================================
   SECTION 7: CANVAS — สร้างภาพใบรับรองผลคะแนน
   ===================================================== */
/** สร้าง Canvas certificate และแสดง Modal — ปรับปรุงให้รองรับมือถือได้เสถียรขึ้น */
async function generateAndShowCertificate(data) {
  const btn = document.getElementById('btn-capture');
  const originalContent = btn ? btn.innerHTML : '';
  
  if (btn) { 
    btn.textContent = '⏳ กำลังประมวลผลภาพ...'; 
    btn.disabled = true; 
  }

  try {
    // 1. รอให้ Font และทรัพยากรหน้าเว็บพร้อม
    await document.fonts.ready;

    // 2. เรียกฟังก์ชันวาด (แนะนำให้ปรับ drawCertificate ให้คืนค่าเป็น Promise ถ้ามีการใช้รูปภาพ)
    // ในที่นี้เราจะรันมัน และเผื่อเวลาให้ Browser ประมวลผลเล็กน้อย
    await new Promise(resolve => {
      drawCertificate(data);
      setTimeout(resolve, 300); // ให้เวลา Canvas วาด Pixel ลงหน่วยความจำ
    });

    // 3. แสดง Modal Overlay
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
      overlay.style.display = 'flex'; // มั่นใจว่ามันจะปรากฏตัว
      setTimeout(() => {
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
      }, 10);
      
      // เลื่อนขึ้นไปบนสุดของ Modal เพื่อให้เห็นรูปชัดเจน
      overlay.scrollTop = 0;
    }

    if (typeof showToast === 'function') showToast('✅ สร้างภาพสำเร็จ! กรุณากดค้างที่รูปเพื่อบันทึก');

  } catch (e) {
    console.error("Certificate Generation Error:", e);
    if (typeof showToast === 'function') showToast('❌ เกิดข้อผิดพลาดในการสร้างภาพ');
  } finally {
    if (btn) { 
      btn.innerHTML = originalContent; 
      btn.disabled = false; 
    }
  }
}

/** * วาด Certificate บน Canvas 
 * ฉบับปรับปรุง: รองรับความคมชัดสูงและรวม Helper Functions
 */
function drawCertificate(data) {
  const canvas = document.getElementById('result-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  // 1. จัดการความคมชัด (Device Pixel Ratio)
  const dpr = window.devicePixelRatio || 1;
  const W = 800;
  const H = 1100;
  
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.scale(dpr, dpr);

  const grade = getGrade(data.score, data.total);
  const isDark = state.theme === 'dark';

  /* ── Background Gradient ──────────────────────── */
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  if (isDark) {
    bgGrad.addColorStop(0, '#0d0d2e');
    bgGrad.addColorStop(0.5, '#1a1040');
    bgGrad.addColorStop(1, '#0d1e2e');
  } else {
    bgGrad.addColorStop(0, '#e8f4ff');
    bgGrad.addColorStop(0.5, '#f0e8ff');
    bgGrad.addColorStop(1, '#e8fff5');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  /* ── Decorative top accent bar ─────────────────── */
  const accentGrad = ctx.createLinearGradient(0, 0, W, 0);
  accentGrad.addColorStop(0, '#0071E3');
  accentGrad.addColorStop(0.5, '#7367F0');
  accentGrad.addColorStop(1, '#28C76F');
  ctx.fillStyle = accentGrad;
  ctx.fillRect(0, 0, W, 6);

  /* ── Card Background ────────────────── */
  const cardX = 40, cardY = 30, cardW = W - 80, cardH = H - 60;
  drawRoundRect(ctx, cardX, cardY, cardW, cardH, 28);
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.88)';
  ctx.fill();
  ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.05)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  /* ── Header Section ────────────────────────────── */
  const textColor = isDark ? '#f0f0fc' : '#0d0d1e';
  const mutedColor = isDark ? '#9090c0' : '#6060a0';
  const accentColor = '#0071E3';

  // App Title
  ctx.shadowColor = 'rgba(0,0,0,0.15)';
  ctx.shadowBlur = 10;
  ctx.font = 'bold 52px Kanit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = textColor;
  ctx.fillText('Shopfloor Management', W / 2, 115);
  
  ctx.shadowBlur = 0; // Reset shadow
  ctx.font = '500 24px Sarabun, sans-serif';
  ctx.fillStyle = mutedColor;
  ctx.fillText('ใบรับรองผลการทดสอบความรู้', W / 2, 174);

  drawDividerLine(ctx, cardX + 40, 190, cardW - 80, isDark);

  /* ── Test Type Badge ────────────────────────────── */
  const modeLabel = data.mode === 'pre' ? 'Pre-test (ก่อนอบรม)' : 'Post-test (หลังอบรม)';
  const modeBgColor = data.mode === 'pre' ? '#FF9F43' : '#0071E3';
  drawSimpleBadge(ctx, W / 2, 224, modeLabel, '#ffffff', modeBgColor);

  /* ── Score Circle ──────────────────────────────── */
  const cx = W / 2, cy = 340, r = 90;
  const ringGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  ringGrad.addColorStop(0, accentColor);
  ringGrad.addColorStop(1, '#7367F0');
  
  ctx.strokeStyle = ringGrad;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.font = 'bold 58px Kanit, sans-serif';
  ctx.fillStyle = textColor;
  ctx.fillText(data.score, cx, cy + 12);

  ctx.font = '500 18px Sarabun, sans-serif';
  ctx.fillStyle = mutedColor;
  ctx.fillText(`/ ${data.total} ข้อ`, cx, cy + 36);

  ctx.font = 'bold 20px Kanit, sans-serif';
  ctx.fillStyle = accentColor;
  ctx.fillText(data.pct + '%', cx, cy + r + 30);

  /* ── Grade Badge ────────────────────────────────── */
  const gradeColors = { 'grade-excellent': '#28C76F', 'grade-good': '#0071E3', 'grade-pass': '#FF9F43', 'grade-fail': '#EA5455' };
  const gradeColor = gradeColors[grade.cls] || accentColor;
  drawSimpleBadge(ctx, W / 2, cy + r + 66, `${grade.emoji}  ${grade.label}`, gradeColor, gradeColor + '22', true);

  /* ── Info Section ───────────────────────────────── */
  let infoY = 508;
  drawDividerLine(ctx, cardX + 40, infoY, cardW - 80, isDark);
  infoY += 40;

  const infoItems = [
    { icon: '👤', label: 'ชื่อผู้สอบ', value: data.name || 'ไม่ระบุชื่อ' },
    { icon: '📅', label: 'วันที่ทดสอบ', value: data.date },
    { icon: '📊', label: 'คะแนนที่ได้', value: `${data.score}/${data.total} (${data.pct}%)` },
    { icon: '🏅', label: 'เกณฑ์ประเมิน', value: grade.label }
  ];

  infoItems.forEach((item, i) => {
    const rowY = infoY + (i * 38);
    ctx.textAlign = 'left';
    ctx.font = '16px Sarabun, sans-serif';
    ctx.fillText(item.icon, cardX + 60, rowY);
    ctx.font = '500 14px Sarabun, sans-serif';
    ctx.fillStyle = mutedColor;
    ctx.fillText(item.label, cardX + 95, rowY);
    ctx.textAlign = 'right';
    ctx.font = '600 15px Kanit, sans-serif';
    ctx.fillStyle = textColor;
    ctx.fillText(item.value, cardX + cardW - 60, rowY);
  });

  /* ── Q&A Grid ─────────────────────────── */
  const gridY = infoY + (infoItems.length * 38) + 10;
  drawDividerLine(ctx, cardX + 40, gridY, cardW - 80, isDark);

  ctx.textAlign = 'left';
  ctx.font = '700 14px Kanit, sans-serif';
  ctx.fillStyle = mutedColor;
  ctx.fillText('📋  ผลการตอบรายข้อ', cardX + 60, gridY + 30);

  const dotSize = 42, dotGap = 12, dotsPerRow = 5;
  const gridStartX = (W - (dotsPerRow * dotSize + (dotsPerRow - 1) * dotGap)) / 2;
  const gridStartY = gridY + 55;

  state.answers.forEach((ans, i) => {
    const col = i % dotsPerRow;
    const row = Math.floor(i / dotsPerRow);
    const x = gridStartX + col * (dotSize + dotGap) + dotSize / 2;
    const y = gridStartY + row * (dotSize + dotGap + 10) + dotSize / 2;

    ctx.fillStyle = ans.correct ? (isDark ? '#28C76F44' : '#28C76F22') : (isDark ? '#EA545544' : '#EA545522');
    ctx.beginPath(); ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = ans.correct ? '#28C76F' : '#EA5455';
    ctx.lineWidth = 2; ctx.stroke();

    ctx.font = 'bold 15px Kanit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = ans.correct ? '#28C76F' : '#EA5455';
    ctx.fillText(i + 1, x, y + 5);
  });

  /* ── Footer ─────────────────────────────────────── */
  const footerY = H - 75;
  drawDividerLine(ctx, cardX + 40, footerY, cardW - 80, isDark);
  ctx.font = '500 13px Sarabun, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = mutedColor;
  ctx.fillText('Shopfloor Management Training Program • MMM Group', W / 2, footerY + 25);
  ctx.font = 'italic 11px Sarabun, sans-serif';
  ctx.fillText(`ID: ${data.name || 'Guest'}-${Date.now().toString().slice(-6)}`, W / 2, footerY + 45);

  // --- INTERNAL HELPERS ---
  function drawRoundRect(c, x, y, w, h, r) {
    c.beginPath(); c.moveTo(x + r, y); c.lineTo(x + w - r, y);
    c.quadraticCurveTo(x + w, y, x + w, y + r); c.lineTo(x + w, y + h - r);
    c.quadraticCurveTo(x + w, y + h, x + w - r, y + h); c.lineTo(x + r, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - r); c.lineTo(x, y + r);
    c.quadraticCurveTo(x, y, x + r, y); c.closePath();
  }

  function drawDividerLine(c, x, y, w, dark) {
    c.beginPath(); c.moveTo(x, y); c.lineTo(x + w, y);
    c.strokeStyle = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';
    c.lineWidth = 1; c.stroke();
  }

  function drawSimpleBadge(c, x, y, txt, tCol, bCol, outline = false) {
    c.font = 'bold 14px Kanit, sans-serif';
    const tw = c.measureText(txt).width;
    const bw = tw + 32, bh = 32;
    c.fillStyle = bCol;
    drawRoundRect(c, x - bw / 2, y - bh / 2, bw, bh, 10);
    c.fill();
    if (outline) { c.strokeStyle = tCol; c.lineWidth = 1.5; c.stroke(); }
    c.fillStyle = tCol; c.textAlign = 'center';
    c.fillText(txt, x, y + 5);
  }
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
   SECTION 8: MODAL EVENTS & DOWNLOAD LOGIC
   ===================================================== */

/** 1. Bind events ทั้งหมดใน Modal */
function bindModalEvents() {
  // 1. ปุ่มปิด Modal (ใช้ selectors เพื่อความแม่นยำ)
  const closeBtns = ['btn-modal-close', 'btn-modal-close2'];
  closeBtns.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      // ใช้ onclick และมั่นใจว่าไม่มีอะไรขวาง
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation(); // หยุดการส่งผ่าน event ไม่ให้ไปโดนชั้นล่าง
        closeModal();
      };
      // เสริม: บังคับให้ปุ่มอยู่ชั้นบนสุดด้วย CSS ผ่าน JS
      btn.style.zIndex = "1001"; 
      btn.style.position = "relative";
    }
  });

  // 2. การคลิกพื้นที่ว่าง (Overlay) เพื่อปิด
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.onclick = (e) => {
      // ปิดเฉพาะเมื่อคลิกที่พื้นหลังสีดำ (Overlay) เท่านั้น
      // ไม่ปิดเมื่อคลิกที่ตัวรูปภาพหรือกล่องเนื้อหา
      if (e.target === overlay) {
        closeModal();
      }
    };
  }

  // 3. ปุ่มดาวน์โหลด
  const btnDownload = document.getElementById('btn-download');
  if (btnDownload) {
    btnDownload.onclick = (e) => {
      e.preventDefault();
      downloadCertificate();
    };
  }
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    // ปิดการแสดงผล
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    
    // สำคัญ: หน่วงเวลาเล็กน้อยก่อนซ่อนเพื่อความสวยงาม (ถ้ามี Transition)
    setTimeout(() => {
      if (!overlay.classList.contains('open')) {
        overlay.style.display = 'none';
      }
    }, 300);

    // คืนค่าการเลื่อนหน้าจอ
    document.body.style.overflow = '';
    document.body.style.touchAction = 'auto';
  }
}

/** 3. ฟังก์ชันจัดการการบันทึกภาพ (รองรับทั้ง PC และ Mobile) */
function downloadCertificate() {
  const canvas = document.getElementById('result-canvas');
  if (!canvas) {
    showToast('❌ ไม่พบไฟล์ภาพ กรุณาลองใหม่');
    return;
  }

  try {
    // 1. สร้างชื่อไฟล์
    const fileName = typeof buildFilename === 'function' 
      ? buildFilename() 
      : `Result_${state.name || 'User'}_${Date.now()}.png`;

    // 2. แปลง Canvas เป็น Blob (วิธีนี้เนียนกว่า DataURL สำหรับ iOS)
    canvas.toBlob((blob) => {
      if (!blob) {
        showToast('❌ ไม่สามารถสร้างไฟล์ภาพได้');
        return;
      }

      // 3. สร้าง URL ชั่วคราวจาก Blob
      const url = window.URL.createObjectURL(blob);
      
      // 4. สร้าง Link ล่องหนเพื่อสั่งดาวน์โหลด
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;

      // 5. สำหรับ iOS/Safari ต้องเพิ่ม Link เข้าไปใน Document ก่อนคลิก
      document.body.appendChild(link);
      
      // 6. สั่งดาวน์โหลด
      link.click();

      // 7. เคลียร์หน่วยความจำและลบ Link ออก
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 150);

      showToast('✅ กำลังเริ่มการดาวน์โหลด...');
      
    }, 'image/png');

  } catch (e) {
    showToast('❌ ระบบบันทึกภาพขัดข้อง');
    console.error('Download Error:', e);
  }
}

/** 4. ฟังก์ชันเสริม: สร้างชื่อไฟล์ (ถ้ายังไม่ได้เขียนไว้) */
function buildFilename() {
  const name = state.name ? state.name.replace(/\s+/g, '_') : 'Guest';
  const mode = state.mode || 'test';
  const date = new Date().toISOString().slice(0, 10);
  return `Certificate_${name}_${mode}_${date}.png`;
}

/* =====================================================
   SECTION 9: INITIALIZATION & HOME LOGIC
   ===================================================== */

/** 1. ฟังก์ชันเริ่มต้นแอพ (Entry Point) */
async function init() {
  console.log("🚀 App Initializing...");
  
  // 1. Safety Check: ตรวจสอบว่ามี Object state หรือยัง (ป้องกัน Error: state is not defined)
  if (typeof state === 'undefined') {
    window.state = { name: '', theme: 'light', answers: [], questions: [] };
  }
  
  // 2. โหลดชื่อจาก LocalStorage
  const savedName = localStorage.getItem('sfmq_name');
  if (savedName) {
    state.name = savedName;
    console.log("👤 พบชื่อผู้ใช้งาน:", state.name);
  }

  // 3. จัดการ Theme
  const savedTheme = localStorage.getItem('sfmq_theme') || 'light';
  state.theme = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);

  // 4. Loading Animation (Logic เดิมของคุณดีอยู่แล้ว)
  const bar = document.getElementById('loading-bar-fill');
  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 20 + 10;
    if (bar) bar.style.width = Math.min(progress, 92) + '%';
    
    if (progress >= 92) {
      clearInterval(loadInterval);
      
      setTimeout(async () => {
        if (bar) bar.style.width = '100%';
        
        setTimeout(async () => {
          // เปลี่ยนหน้าไป Home
          goScreen('home');
          
          // ดึงข้อมูลจาก Firebase มาโชว์คะแนนเก่าที่หน้าแรก
          // หากไม่มีชื่อ (savedName) ฟังก์ชันนี้จะข้ามการดึงข้อมูลไปเองตามที่เราเขียนดักไว้
          await renderHome(); 
          
          syncThemeIcons();
        }, 400);
      }, 200);
    }
  }, 120);

  // 5. ผูกเหตุการณ์พื้นฐาน
  bindModalEvents();

  // 6. ป้องกัน iOS Multi-touch Zoom
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) e.preventDefault();
  }, { passive: false });
}
/** 2. จัดการเหตุการณ์ในหน้าหลัก (Home) */
async function bindHomeEvents() {
  let preData = null;
  let postData = null;

  // ดึงข้อมูลสถานะการสอบจาก Firebase
  if (state.name) {
    try {
      // ดึงข้อมูลพร้อมกัน (Parallel) เพื่อความรวดเร็ว
      const [data1, data2] = await Promise.all([
        loadFromFirebase('pre'),
        loadFromFirebase('post')
      ]);
      preData = data1;
      postData = data2;
    } catch (e) {
      console.warn("⚠️ Firebase load incomplete:", e);
    }
  }

  /** Helper สำหรับปุ่มที่กดติดชัวร์บน iOS/Android */
  const setupBtn = (id, callback) => {
    const el = document.getElementById(id);
    if (!el) return;

    // ล้าง Event เก่าเพื่อความสดใหม่
    const newBtn = el.cloneNode(true);
    el.parentNode.replaceChild(newBtn, el);

    newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      callback(newBtn);
    });
  };

  // ปุ่ม Pre-test
  setupBtn('btn-pre', () => {
    if (preData) {
      showToast('⚠️ คุณสอบ Pre-test ไปแล้วครับ');
    } else {
      if (!state.name) return showToast('❌ กรุณาระบุชื่อ-นามสกุล');
      startQuiz('pre');
    }
  });

  // ปุ่ม Post-test
  setupBtn('btn-post', () => {
    if (postData) {
      showToast('⚠️ คุณสอบ Post-test ไปแล้วครับ');
    } else {
      if (!state.name) return showToast('❌ กรุณาระบุชื่อ-นามสกุล');
      startQuiz('post');
    }
  });

  // ปุ่มเปลี่ยนธีม
  setupBtn('btn-theme', () => toggleTheme());

  // ปุ่มลบข้อมูล (Reset)
  setupBtn('btn-reset', async () => {
    if (confirm('⚠️ ยืนยันการลบข้อมูลประวัติการสอบของคุณ?')) {
      try {
        if (state.name) {
          // อ้างอิงชื่อคอลเลกชันให้ถูกต้องตามที่เราตั้งค่าใน Section 2
          await db.collection("results").doc(`${state.name}_pre`).delete();
          await db.collection("results").doc(`${state.name}_post`).delete();
        }
        localStorage.clear();
        window.location.reload();
      } catch (err) {
        showToast('❌ ไม่สามารถลบข้อมูลได้');
      }
    }
  });

  // จัดการสถานะ Visual ของปุ่ม
  const updateUI = (el, hasData) => {
    if (!el) return;
    if (hasData) {
      el.style.opacity = "0.4";
      el.style.filter = "grayscale(100%)";
      el.style.pointerEvents = "auto"; // ให้กดได้เพื่อให้ Toast แจ้งเตือนทำงาน
    } else {
      el.style.opacity = "1";
      el.style.filter = "none";
    }
  };
  updateUI(document.getElementById('btn-pre'), preData);
  updateUI(document.getElementById('btn-post'), postData);

  // จัดการ Input ชื่อ
  const inputName = document.getElementById('input-name');
  if (inputName) {
    inputName.value = state.name || "";
    inputName.oninput = () => {
      state.name = inputName.value.trim();
      localStorage.setItem('sfmq_name', state.name);
    };
    
    // เมื่อพิมพ์จบและกดออก ให้รีเฟรชหน้าหลักเพื่อไปเช็ค Firebase ของชื่อใหม่
    inputName.onblur = () => {
      if (state.name) renderHome();
    };
  }
}

// เริ่มการทำงานทันที
init();
