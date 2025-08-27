export type Language = "english" | "tamil";

export type Intent = 
  | "greeting"
  | "anxiety" 
  | "stress"
  | "sleep"
  | "low_mood"
  | "coping"
  | "mood_tracking"
  | "gratitude"
  | "meta"
  | "crisis"
  | "general";

export interface ChatResponse {
  message: string;
  intent: Intent;
  isEmergency: boolean;
}

// Crisis detection keywords
const CRISIS_KEYWORDS = [
  // English
  "suicide", "kill myself", "end my life", "want to die", "harm myself", 
  "not worth living", "better off dead", "end it all", "take my own life",
  "hurt myself", "self harm", "cut myself", "overdose", "jump off",
  
  // Tamil (common crisis expressions)
  "தற்கொலை", "சாக வேண்டும்", "உயிர் போக வேண்டும்", "இறக்க வேண்டும்",
  "தன்னை கொல்ல", "உயிரை மாய்த்து", "வாழ்க்கை வேண்டாம்"
];

// Intent classification keywords
const INTENT_KEYWORDS = {
  anxiety: ["anxious", "nervous", "worry", "panic", "scared", "fear", "tension", "கவலை", "பயம்", "பதட்டம்"],
  stress: ["stress", "pressure", "overwhelmed", "burden", "tired", "exhausted", "மன அழுத்தம்", "சோர்வு", "நெரிசல்"],
  sleep: ["sleep", "insomnia", "tired", "sleepy", "rest", "bed", "dream", "nightmare", "தூக்கம்", "உறக்கம்", "கனவு"],
  low_mood: ["sad", "depressed", "down", "lonely", "empty", "hopeless", "worthless", "சோகம்", "மனவேதனை", "தனிமை"],
  coping: ["help", "cope", "manage", "deal with", "handle", "strategy", "technique", "உதவி", "சமாளிக்க", "முறை"],
  mood_tracking: ["mood", "feeling", "track", "record", "log", "diary", "மனநிலை", "உணர்வு", "பதிவு"],
  gratitude: ["thank", "grateful", "appreciate", "positive", "good", "happy", "blessed", "நன்றி", "மகிழ்ச்சி", "நல்லது"],
  meta: ["who are you", "what are you", "doctor", "therapist", "medical", "யார் நீங்கள்", "என்ன நீங்கள்", "மருத்துவர்"]
};

// Response templates
const RESPONSES = {
  english: {
    crisis: "I'm very concerned about what you've shared. If you're having thoughts of self-harm, please reach out for immediate help:\n\n🚨 Emergency: 112\n📞 Mental Health Helpline: 1800-599-0019\n💬 Text HELLO to 741741\n\nYou matter, and there are people who want to help you through this difficult time.",
    
    anxiety: "I understand you're feeling anxious. Anxiety can be overwhelming, but there are ways to help manage it:\n\n• Try the 4-7-8 breathing technique: Breathe in for 4, hold for 7, exhale for 8\n• Ground yourself: Name 5 things you can see, 4 you can hear, 3 you can touch\n• Remember: This feeling will pass\n\nWould you like to practice a breathing exercise together?",
    
    stress: "Stress can feel overwhelming, but you're not alone in this. Here are some gentle techniques:\n\n• Take a few slow, deep breaths\n• Try the 5-minute rule: Focus on just the next 5 minutes\n• Practice self-compassion - be kind to yourself\n• Consider what you can control vs. what you can't\n\nWhat's one small thing that usually helps you feel calmer?",
    
    sleep: "Sleep troubles can really affect how we feel. Here are some gentle sleep hygiene tips:\n\n• Try to keep consistent sleep/wake times\n• Create a calming bedtime routine\n• Limit screens 1 hour before bed\n• Try progressive muscle relaxation\n\nHave you noticed any patterns in what affects your sleep?",
    
    low_mood: "I hear that you're going through a difficult time. Your feelings are valid, and it's okay to not be okay sometimes.\n\n• Remember: You are worthy of care and support\n• Try to do one small thing you usually enjoy\n• Connect with someone you trust\n• Be gentle with yourself\n\nWould you like to talk about what's been weighing on your mind?",
    
    coping: "It's wonderful that you're looking for healthy ways to cope. Here are some evidence-based techniques:\n\n• Mindfulness: Try 5-10 minutes of meditation daily\n• Physical activity: Even a short walk can help\n• Creative outlets: Drawing, writing, music\n• Social connection: Reach out to supportive people\n\nWhat type of activities usually feel most natural to you?",
    
    mood_tracking: "Tracking your mood is a great way to understand your patterns! I can help you log how you're feeling. Would you like to record your current mood? You can rate it from 0-10 and add any notes about what might be influencing how you feel today.",
    
    gratitude: "Thank you for sharing that positive moment! Gratitude can be really powerful for our wellbeing. Some ways to build on this:\n\n• Keep a daily gratitude journal\n• Share appreciation with others\n• Notice small positive moments\n• Celebrate your progress\n\nWhat's something else you've been grateful for recently?",
    
    meta: "I'm a supportive chatbot designed to provide wellness guidance and a listening ear. I'm not a doctor or therapist, and I can't provide medical advice or diagnosis. I'm here to offer evidence-based coping strategies and emotional support. For professional help, please consult qualified mental health professionals.",
    
    general: "I'm here to listen and support you. Sometimes just talking about what's on your mind can help. Feel free to share whatever you're comfortable with - whether it's how you're feeling, something that's bothering you, or even something positive that happened today."
  },
  
  tamil: {
    crisis: "நீங்கள் பகிர்ந்த விஷயத்தைப் பற்றி நான் மிகவும் கவலைப்படுகிறேன். உங்களுக்கு தன்னை காயப்படுத்தும் எண்ணங்கள் இருந்தால், உடனடியாக உதவி கேளுங்கள்:\n\n🚨 அவசரநிலை: 112\n📞 மனநலம் உதவி எண்: 1800-599-0019\n\nநீங்கள் முக்கியமானவர், இந்த கடினமான நேரத்தில் உங்களுக்கு உதவ விரும்பும் மக்கள் உள்ளனர்.",
    
    anxiety: "நீங்கள் கவலையாக உணர்கிறீர்கள் என்பதை நான் புரிந்துகொள்கிறேன். கவலை மிகவும் கடினமாக இருக்கும், ஆனால் அதை சமாளிக்க வழிகள் உள்ளன:\n\n• 4-7-8 மூச்சு நுட்பம்: 4 எண்ணுங்கள், 7 நிறுத்துங்கள், 8 மூச்சை வெளியே விடுங்கள்\n• தரையில் கால்பதிக்கவும்: 5 விஷயங்களைப் பாருங்கள், 4 கேளுங்கள், 3 தொடுங்கள்\n• நினைவில் வைக்கவும்: இந்த உணர்வு கடந்து போகும்\n\nசேர்ந்து மூச்சுப் பயிற்சி செய்ய விரும்புகிறீர்களா?",
    
    stress: "மன அழுத்தம் மிகவும் கடினமாக உணரலாம், ஆனால் இதில் நீங்கள் தனியாக இல்லை. சில மென்மையான நுட்பங்கள்:\n\n• சில மெதுவான, ஆழமான மூச்சுகள் எடுங்கள்\n• 5 நிமிட விதி: அடுத்த 5 நிமிடங்களில் மட்டும் கவனம் செலுத்துங்கள்\n• உங்களுக்கு இரக்கம் காட்டுங்கள்\n• நீங்கள் கட்டுப்படுத்த முடியாதவற்றை விட்டுவிடுங்கள்\n\nசாதாரணமாக உங்களை அமைதிப்படுத்த உதவும் ஒரு சிறிய விஷயம் என்ன?",
    
    sleep: "தூக்கப் பிரச்சனைகள் நம் உணர்வுகளை மிகவும் பாதிக்கும். சில மென்மையான தூக்க சுகாதார குறிப்புகள்:\n\n• நிலையான தூக்க/விழிப்பு நேரம் வைக்கவும்\n• அமைதியான படுக்கை நேர வழக்கம் உருவாக்கவும்\n• படுக்கைக்கு 1 மணி நேரத்திற்கு முன் திரைகளைக் குறைக்கவும்\n• படிப்படியான தசை தளர்வைப் பயிற்சி செய்யுங்கள்\n\nஉங்கள் தூக்கத்தைப் பாதிக்கும் எதையாவது கவனித்திருக்கிறீர்களா?",
    
    low_mood: "நீங்கள் கடினமான காலத்தில் இருக்கிறீர்கள் என்பதை நான் கேட்கிறேன். உங்கள் உணர்வுகள் சரியானவை, சில நேரங்களில் நல்லாக இல்லாமல் இருப்பது பரவாயில்லை.\n\n• நினைவில் கொள்ளுங்கள்: நீங்கள் பராமரிப்புக்கு தகுதியானவர்\n• நீங்கள் பொதுவாக அனுபவிக்கும் ஒரு சிறிய விஷயத்தைச் செய்ய முயற்சிக்கவும்\n• நீங்கள் நம்பும் ஒருவருடன் தொடர்பு கொள்ளுங்கள்\n• உங்களுக்கு மென்மையாக இருங்கள்\n\nஉங்கள் மனதை பாரமாக்கும் விஷயத்தைப் பற்றி பேச விரும்புகிறீர்களா?",
    
    coping: "ஆரோக்கியமான வழிகளைத் தேடுவது அருமை. சில சான்று அடிப்படையிலான நுட்பங்கள்:\n\n• நினைவாற்றல்: தினமும் 5-10 நிமிடங்கள் தியானம் செய்யுங்கள்\n• உடல் செயல்பாடு: ஒரு சிறிய நடைகூட உதவும்\n• படைப்பு: வரைதல், எழுதுதல், இசை\n• சமூக தொடர்பு: ஆதரவான மக்களை தொடர்பு கொள்ளுங்கள்\n\nபொதுவாக எந்த வகையான செயல்பாடுகள் உங்களுக்கு இயல்பாக உணர்கின்றன?",
    
    mood_tracking: "உங்கள் மனநிலையைக் கண்காணிப்பது உங்கள் முறைகளைப் புரிந்துகொள்ள ஒரு சிறந்த வழி! நீங்கள் எப்படி உணர்கிறீர்கள் என்பதைப் பதிவு செய்ய நான் உதவ முடியும். உங்கள் தற்போதைய மனநிலையைப் பதிவு செய்ய விரும்புகிறீர்களா? நீங்கள் அதை 0-10 என மதிப்பிட்டு, இன்று உங்களை எப்படி உணர வைக்கிறது என்பதைப் பற்றிய குறிப்புகளைச் சேர்க்கலாம்.",
    
    gratitude: "அந்த நேர்மறையான தருணத்தைப் பகிர்ந்ததற்கு நன்றி! நன்றியுணர்வு நம் நல்வாழ்வுக்கு மிகவும் சக்திவாய்nt்தது. இதை வளர்க்கும் சில வழிகள்:\n\n• தினசரி நன்றி பத்திரிகை வைக்கவும்\n• மற்றவர்களுடன் பாராட்டுகளைப் பகிர்ந்து கொள்ளுங்கள்\n• சிறிய நேர்மறையான தருணங்களைக் கவனியுங்கள்\n• உங்கள் முன்னேற்றத்தைக் கொண்டாடுங்கள்\n\nநீங்கள் சமீபத்தில் நன்றியுணர்ந்த வேறு ஏதாவது இருக்கிறதா?",
    
    meta: "நான் நல்வாழ்வு வழிகாட்டுதலையும் கேட்கும் காதையும் வழங்க வடிவமைக்கப்பட்ட ஒரு ஆதரவு சாட்பாட். நான் மருத்துவர் அல்லது சிகிச்சையாளர் அல்ல, மருத்துவ ஆலோசனை அல்லது நோயறிதலை வழங்க முடியாது. சான்று அடிப்படையிலான சமாளிப்பு உத்திகள் மற்றும் உணர்ச்சி ஆதரவை வழங்க நான் இங்கே இருக்கிறேன். தொழில்முறை உதவிக்கு, தகுதியான மனநல நிபுணர்களைக் கலந்தாலோசிக்கவும்.",
    
    general: "நான் உங்களைக் கேட்டு ஆதரிக்க இங்கே இருக்கிறேன். சில நேரங்களில் உங்கள் மனதில் உள்ளதைப் பற்றி பேசுவதே உதவியாக இருக்கும். நீங்கள் வசதியாக உணரும் எதையும் பகிரலாம் - நீங்கள் எப்படி உணர்கிறீர்கள், உங்களைத் தொந்தரவு செய்யும் ஏதாவது, அல்லது இன்று நடந்த நேர்மறையான ஏதாவது."
  }
};

// Detect crisis keywords in user input
function detectCrisis(input: string): boolean {
  const lowerInput = input.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lowerInput.includes(keyword));
}

// Classify user intent based on keywords
function classifyIntent(input: string): Intent {
  const lowerInput = input.toLowerCase();
  
  // Check for each intent
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    if (keywords.some(keyword => lowerInput.includes(keyword))) {
      return intent as Intent;
    }
  }
  
  // Common greeting patterns
  if (/^(hi|hello|hey|good morning|good evening|வணக்கம்|ஹலோ)/i.test(lowerInput)) {
    return "greeting";
  }
  
  return "general";
}

// Main chat AI function
export async function chatAI(userInput: string, language: Language): Promise<ChatResponse> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const isEmergency = detectCrisis(userInput);
  
  if (isEmergency) {
    return {
      message: RESPONSES[language].crisis,
      intent: "crisis",
      isEmergency: true
    };
  }
  
  const intent = classifyIntent(userInput);
  const responseKey = intent as keyof typeof RESPONSES.english;
  const message = RESPONSES[language][responseKey] || RESPONSES[language].general;
  
  return {
    message,
    intent,
    isEmergency: false
  };
}