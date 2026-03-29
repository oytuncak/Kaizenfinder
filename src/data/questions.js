export const sections = [
  {
    id: 'love',
    key: 'love',
    title: 'What You LOVE',
    subtitle: 'Passion & Joy',
    emoji: '❤️',
    color: '#FF6B8A',
    colorLight: '#FFD6E0',
    colorGrad: 'linear-gradient(135deg, #FF6B8A 0%, #FF4757 100%)',
    description: 'What ignites your soul and makes you feel truly alive?',
    xpLabel: 'Heart Circle Unlocked',
    questions: [
      {
        id: 'love_1',
        type: 'tags',
        question: 'Which activities make you lose track of time?',
        hint: 'Select all that resonate with you',
        options: [
          'Creating art', 'Teaching others', 'Solving puzzles', 'Writing',
          'Cooking & Food', 'Building things', 'Helping people', 'Performing',
          'Researching', 'Organizing', 'Playing games', 'Sports & Fitness',
          'Making music', 'Gardening', 'Photography', 'Storytelling'
        ]
      },
      {
        id: 'love_2',
        type: 'tags',
        question: 'What topics could you discuss for hours without getting bored?',
        hint: 'Pick your genuine obsessions',
        options: [
          'Technology', 'Human psychology', 'Nature & Wildlife', 'History',
          'Science', 'Art & Design', 'Business & Money', 'Health & Wellness',
          'Philosophy', 'Sports', 'Music', 'Travel', 'Food culture',
          'Spirituality', 'Social issues', 'Outer space'
        ]
      },
      {
        id: 'love_3',
        type: 'slider',
        question: 'When you were a child, what did you dream of doing with your life?',
        hint: 'Think back to your earliest dreams and ambitions',
        sliderQuestion: 'How connected do you still feel to those childhood dreams?',
        labels: ['Completely lost it', 'Barely remember', 'Sometimes recall', 'Still connected', 'Still my dream']
      },
      {
        id: 'love_4',
        type: 'text',
        question: 'Complete this sentence:',
        prompt: '"I feel most alive when I am..."',
        placeholder: 'e.g., deep in creative work, connecting with someone new, solving a hard problem...',
      }
    ]
  },
  {
    id: 'good_at',
    key: 'good_at',
    title: 'What You\'re GOOD AT',
    subtitle: 'Talents & Mastery',
    emoji: '⭐',
    color: '#4ECDC4',
    colorLight: '#D4F5F3',
    colorGrad: 'linear-gradient(135deg, #4ECDC4 0%, #2BC0B4 100%)',
    description: 'What are your natural gifts and hard-won skills?',
    xpLabel: 'Star Circle Unlocked',
    questions: [
      {
        id: 'good_1',
        type: 'tags',
        question: 'What do people regularly come to you for help with?',
        hint: 'What expertise do others recognize in you?',
        options: [
          'Technical fixes', 'Creative direction', 'Advice & guidance', 'Planning',
          'Teaching & explaining', 'Physical tasks', 'Communication', 'Research',
          'Leadership', 'Emotional support', 'Financial thinking', 'Cooking',
          'Design & aesthetics', 'Writing & editing', 'Data & analysis', 'Connecting people'
        ]
      },
      {
        id: 'good_2',
        type: 'tags',
        question: 'Which skills have you spent 100+ hours developing?',
        hint: 'Your deliberately practiced abilities',
        options: [
          'Programming/Tech', 'Public speaking', 'Writing', 'Drawing/Design',
          'Playing music', 'Athletics/Sports', 'Management', 'Sales',
          'Academic research', 'Craftsmanship', 'Languages', 'Teaching',
          'Negotiation', 'Strategic thinking', 'Healing/Care', 'Storytelling'
        ]
      },
      {
        id: 'good_3',
        type: 'slider',
        question: 'Your unique strengths',
        hint: 'Be honest — what comes naturally to you that others find difficult?',
        sliderQuestion: 'How confident are you in your unique abilities compared to most people?',
        labels: ['I have no idea', 'Below average', 'About average', 'Above average', 'Exceptional']
      },
      {
        id: 'good_4',
        type: 'text',
        question: 'What do people compliment you on most?',
        prompt: '"People always tell me I\'m great at..."',
        placeholder: 'e.g., listening deeply, explaining complex things simply, staying calm under pressure...',
      }
    ]
  },
  {
    id: 'world_needs',
    key: 'world_needs',
    title: 'What the WORLD NEEDS',
    subtitle: 'Mission & Impact',
    emoji: '🌍',
    color: '#96CEB4',
    colorLight: '#DCEFD6',
    colorGrad: 'linear-gradient(135deg, #96CEB4 0%, #68B99A 100%)',
    description: 'What problems exist that bother you deeply?',
    xpLabel: 'World Circle Unlocked',
    questions: [
      {
        id: 'world_1',
        type: 'tags',
        question: 'Which challenges in the world concern you most?',
        hint: 'The problems that genuinely keep you up at night',
        options: [
          'Education inequality', 'Mental health crisis', 'Climate change', 'Poverty',
          'Healthcare access', 'Technology ethics', 'Social injustice', 'Food security',
          'Loneliness epidemic', 'Economic inequality', 'Environmental damage', 'Youth development',
          'Elder care', 'Animal welfare', 'Innovation gaps', 'Political dysfunction'
        ]
      },
      {
        id: 'world_2',
        type: 'tags',
        question: 'Who do you most feel called to serve and help?',
        hint: 'Your natural sense of responsibility',
        options: [
          'Children & youth', 'Elderly people', 'People who are sick', 'Students',
          'Entrepreneurs', 'Artists & creatives', 'Local communities', 'Animals',
          'The environment', 'Future generations', 'Underprivileged groups', 'Professionals',
          'Families', 'People in crisis', 'Everyone equally', 'Specific minority groups'
        ]
      },
      {
        id: 'world_3',
        type: 'slider',
        question: 'Your sense of calling',
        hint: 'Your gut feeling about your place in the world',
        sliderQuestion: 'How strongly do you feel a personal calling to make a difference?',
        labels: ['Not at all', 'Vaguely', 'Moderately', 'Strongly', 'It drives everything']
      },
      {
        id: 'world_4',
        type: 'text',
        question: 'Your dream impact',
        prompt: '"If I could change one thing about the world, it would be..."',
        placeholder: 'e.g., ensure every child has access to quality education, end loneliness in elderly...',
      }
    ]
  },
  {
    id: 'paid_for',
    key: 'paid_for',
    title: 'What You Can Be PAID FOR',
    subtitle: 'Value & Livelihood',
    emoji: '💡',
    color: '#FFD93D',
    colorLight: '#FFF5CC',
    colorGrad: 'linear-gradient(135deg, #FFD93D 0%, #FFA502 100%)',
    description: 'How can your unique gifts sustain your life?',
    xpLabel: 'Lightbulb Circle Unlocked',
    questions: [
      {
        id: 'paid_1',
        type: 'tags',
        question: 'What types of value do you currently (or could you) provide professionally?',
        hint: 'Think about what people would genuinely pay for',
        options: [
          'Consulting & advice', 'Coaching & mentoring', 'Creating content', 'Building software',
          'Design work', 'Writing & editing', 'Therapy & healing', 'Project management',
          'Sales & marketing', 'Making products', 'Performing & entertaining', 'Research & analysis',
          'Training & teaching', 'Strategy & planning', 'Technical expertise', 'Community building'
        ]
      },
      {
        id: 'paid_2',
        type: 'tags',
        question: 'Which industries could you realistically work in?',
        hint: 'Where your skills meet market demand',
        options: [
          'Technology', 'Healthcare', 'Education', 'Finance & Banking',
          'Creative & Media', 'Non-profits', 'Government', 'Retail & Commerce',
          'Entertainment', 'Sports & Wellness', 'Food & Hospitality', 'Real estate',
          'Environmental sector', 'Social services', 'Manufacturing', 'Agriculture'
        ]
      },
      {
        id: 'paid_3',
        type: 'slider',
        question: 'Work-passion alignment',
        hint: 'How close is your current or most recent work to what truly matters to you?',
        sliderQuestion: 'How aligned is your work/career with your deeper values and skills?',
        labels: ['Completely misaligned', 'Slightly aligned', 'Somewhat aligned', 'Mostly aligned', 'Perfectly aligned']
      },
      {
        id: 'paid_4',
        type: 'text',
        question: 'Your value proposition',
        prompt: '"I could create real value — and get paid — by..."',
        placeholder: 'e.g., helping companies build more ethical products, coaching people through career transitions...',
      }
    ]
  }
]

export const TOTAL_XP = 1000
export const XP_PER_QUESTION = 30
export const XP_PER_SECTION = 130
export const XP_COMPLETION_BONUS = 280

export const LEVELS = [
  { min: 0, max: 249, name: 'Explorer', emoji: '🧭' },
  { min: 250, max: 499, name: 'Seeker', emoji: '🔍' },
  { min: 500, max: 749, name: 'Discoverer', emoji: '🌟' },
  { min: 750, max: 999, name: 'Enlightened', emoji: '🌸' },
  { min: 1000, max: 1000, name: 'Ikigai Master', emoji: '⛩️' }
]

export const ACHIEVEMENTS = [
  { id: 'first_step', title: 'First Step', desc: 'Completed your first circle', emoji: '👣' },
  { id: 'halfway', title: 'Halfway There', desc: 'Completed 2 circles', emoji: '🌗' },
  { id: 'almost', title: 'Almost There', desc: 'Completed 3 circles', emoji: '🌕' },
  { id: 'ikigai_found', title: 'Ikigai Found!', desc: 'All 4 circles complete', emoji: '⛩️' },
  { id: 'introspective', title: 'Deep Thinker', desc: 'Wrote thoughtful answers', emoji: '🧠' },
  { id: 'decisive', title: 'Decisive', desc: 'Answered with confidence', emoji: '⚡' }
]
