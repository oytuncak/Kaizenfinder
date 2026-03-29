export function generateResults(answers) {
  const love = answers.love || {}
  const goodAt = answers.good_at || {}
  const worldNeeds = answers.world_needs || {}
  const paidFor = answers.paid_for || {}

  const loveTags = love.tags || []
  const goodAtTags = goodAt.tags || []
  const worldTags = worldNeeds.tags || []
  const paidTags = paidFor.tags || []

  const loveText = love.text || ''
  const goodText = goodAt.text || ''
  const worldText = worldNeeds.text || ''
  const paidText = paidFor.text || ''

  const loveSlider = love.slider ?? 3
  const goodSlider = goodAt.slider ?? 3
  const worldSlider = worldNeeds.slider ?? 3
  const paidSlider = paidFor.slider ?? 3

  // Generate passion description (Love ∩ Good At)
  const passion = generatePassion(loveTags, goodAtTags, loveText, goodText)
  // Generate mission description (Love ∩ World Needs)
  const mission = generateMission(loveTags, worldTags, worldText)
  // Generate profession description (Good At ∩ Paid For)
  const profession = generateProfession(goodAtTags, paidTags, goodText, paidText)
  // Generate vocation description (Paid For ∩ World Needs)
  const vocation = generateVocation(paidTags, worldTags, paidText, worldText)
  // Generate ikigai — the center of all four
  const ikigai = generateIkigai(passion, mission, profession, vocation, loveTags, goodAtTags, worldTags, paidTags)

  return {
    passion,
    mission,
    profession,
    vocation,
    ikigai,
    topTags: {
      love: loveTags.slice(0, 5),
      good_at: goodAtTags.slice(0, 5),
      world_needs: worldTags.slice(0, 5),
      paid_for: paidTags.slice(0, 5)
    },
    quotes: {
      love: loveText,
      good_at: goodText,
      world_needs: worldText,
      paid_for: paidText
    },
    alignment: {
      love: loveSlider,
      good_at: goodSlider,
      world_needs: worldSlider,
      paid_for: paidSlider
    }
  }
}

function generatePassion(loveTags, goodAtTags, loveText, goodText) {
  const overlap = findOverlap(loveTags, goodAtTags)

  if (overlap.length > 0) {
    return `You have a natural passion for ${formatList(overlap)} — activities you both love and excel at. This is where you enter flow state most easily.`
  }

  const loveThemes = extractThemes(loveTags)
  const goodThemes = extractThemes(goodAtTags)

  if (loveThemes.length && goodThemes.length) {
    return `Your passion lives at the crossroads of ${loveThemes[0]} (what you love) and ${goodThemes[0]} (what you excel at). When these combine, you produce remarkable work effortlessly.`
  }

  return `Your passion emerges when you apply your strongest skills to the things that genuinely excite you. This intersection is where you do your best work without feeling like work.`
}

function generateMission(loveTags, worldTags, worldText) {
  const overlap = findOverlap(loveTags, worldTags)

  if (overlap.length > 0) {
    return `Your mission centers on ${formatList(overlap)} — you genuinely love these areas AND the world needs more people engaged in them.`
  }

  const worldTheme = extractThemes(worldTags)[0] || 'positive change'
  return `Your mission is to use what you love to address the world's need for ${worldTheme}. This is where your joy becomes meaningful contribution.`
}

function generateProfession(goodAtTags, paidTags, goodText, paidText) {
  const overlap = findOverlap(goodAtTags, paidTags)

  if (overlap.length > 0) {
    return `Your profession naturally involves ${formatList(overlap)} — skills that both come naturally to you AND that people are willing to pay for.`
  }

  const goodTheme = extractThemes(goodAtTags)[0] || 'your expertise'
  const paidTheme = extractThemes(paidTags)[0] || 'market demand'
  return `Your profession is built on applying your mastery of ${goodTheme} within contexts where ${paidTheme} creates real economic opportunity.`
}

function generateVocation(paidTags, worldTags, paidText, worldText) {
  const overlap = findOverlap(paidTags, worldTags)

  if (overlap.length > 0) {
    return `Your vocation involves ${formatList(overlap)} — work you can be paid for that also serves a genuine societal need.`
  }

  const worldTheme = extractThemes(worldTags)[0] || 'the world\'s needs'
  return `Your vocation is finding the commercial model that lets you address ${worldTheme} — turning meaningful work into sustainable livelihood.`
}

function generateIkigai(passion, mission, profession, vocation, loveTags, goodAtTags, worldTags, paidTags) {
  const allTags = [...loveTags, ...goodAtTags, ...worldTags, ...paidTags]
  const tagFrequency = {}
  allTags.forEach(tag => {
    tagFrequency[tag] = (tagFrequency[tag] || 0) + 1
  })

  const topTag = Object.entries(tagFrequency)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)[0]

  const loveCore = extractThemes(loveTags)[0] || 'creation'
  const worldCore = extractThemes(worldTags)[0] || 'positive impact'
  const goodCore = extractThemes(goodAtTags)[0] || 'expertise'
  const paidCore = extractThemes(paidTags)[0] || 'value creation'

  return {
    summary: `Your Ikigai lies in using your mastery of ${goodCore} to ${worldCore}, doing so through ${loveCore} in a way that creates sustainable ${paidCore}.`,
    headline: topTag
      ? `A ${topTag}-driven life of purpose and mastery`
      : `A purposeful life at the intersection of passion and impact`,
    pillars: [
      { label: 'Your Fuel', value: loveCore, icon: '❤️' },
      { label: 'Your Edge', value: goodCore, icon: '⭐' },
      { label: 'Your Impact', value: worldCore, icon: '🌍' },
      { label: 'Your Flow', value: paidCore, icon: '💡' }
    ]
  }
}

// Helpers
function findOverlap(arr1, arr2) {
  const set2 = new Set(arr2.map(s => s.toLowerCase()))
  return arr1.filter(item => set2.has(item.toLowerCase()))
}

function formatList(items) {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0].toLowerCase()
  if (items.length === 2) return `${items[0].toLowerCase()} and ${items[1].toLowerCase()}`
  return `${items.slice(0, -1).map(i => i.toLowerCase()).join(', ')}, and ${items[items.length - 1].toLowerCase()}`
}

const THEME_GROUPS = {
  'creative': ['Creating art', 'Writing', 'Photography', 'Storytelling', 'Drawing/Design', 'Writing & editing', 'Creating content', 'Design work', 'Design & aesthetics', 'Art & Design', 'Creative & Media'],
  'technology': ['Technology', 'Programming/Tech', 'Building software', 'Technical expertise', 'Building things'],
  'human connection': ['Teaching others', 'Helping people', 'Emotional support', 'Connecting people', 'Community building', 'Coaching & mentoring', 'Teaching & explaining', 'Advice & guidance'],
  'health & healing': ['Health & Wellness', 'Sports & Fitness', 'Healing/Care', 'Therapy & healing', 'Healthcare', 'Healthcare access'],
  'knowledge & research': ['Researching', 'Academic research', 'Research & analysis', 'Science', 'Research'],
  'leadership & business': ['Leadership', 'Management', 'Strategy & planning', 'Business & Money', 'Finance & Banking', 'Sales & marketing'],
  'social impact': ['Social injustice', 'Mental health', 'Education inequality', 'Poverty', 'Youth development', 'Social services'],
}

function extractThemes(tags) {
  const scores = {}
  tags.forEach(tag => {
    for (const [theme, keywords] of Object.entries(THEME_GROUPS)) {
      if (keywords.some(kw => tag.toLowerCase().includes(kw.toLowerCase()) || kw.toLowerCase().includes(tag.toLowerCase()))) {
        scores[theme] = (scores[theme] || 0) + 1
      }
    }
  })
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([theme]) => theme)
}
