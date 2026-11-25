/* Flashcard decks and the Exam Info page. Figures come from research/exam-facts.md. */
window.NF = window.NF || {};
NF.decks = [
  { id: 'formulations', t: 'Formulation words', cards: [
    ['Soluble granule (SG)', 'Dissolves. True solution. Agitate to dissolve, then it stays, unless the label says otherwise.'],
    ['Soluble powder (SP)', 'Dissolves. True solution. Inhalation hazard while mixing.'],
    ['Water-dispersible granule (WG, WDG, DF)', 'Suspension. Never dissolves. Constant agitation. Lower dust than WP.'],
    ['Wettable powder (WP)', 'Suspension. Constant agitation. Abrasive. Inhalation hazard.'],
    ['Suspension concentrate (SC, F, FL)', 'Suspension. Often shake before use. Termidor HE is one.'],
    ['Emulsifiable concentrate (EC)', 'Emulsion. Milky. Typically needs agitation.'],
    ['Granule (G)', 'Applied dry. Never goes in a sprayer.'],
    ['Dust (D)', 'Applied dry. Never mixed with water. High inhalation and drift hazard.'],
    ['Water-soluble packet (WSP)', 'The bag dissolves. What is inside may only disperse. Read the label. Keep it dry until it goes in the tank.'],
    ['Solution', 'Uniform mix. See-through. Does not separate.'],
    ['Suspension', 'Fine solids in liquid. Opaque. Settles without agitation.'],
    ['Emulsion', 'One liquid held as droplets in another. Milky.']
  ] },
  { id: 'signal', t: 'Signal words and toxicity', cards: [
    ['DANGER', 'Category I. Oral LD50 up to 50 mg/kg.'],
    ['WARNING', 'Category II. Oral LD50 over 50 to 500 mg/kg.'],
    ['CAUTION', 'Category III. Oral LD50 over 500 to 5,000 mg/kg.'],
    ['Category IV', 'Oral LD50 over 5,000 mg/kg. No signal word required.'],
    ['Skull and crossbones', 'With DANGER and POISON when Category I comes from oral, inhalation or dermal toxicity.'],
    ['LD50', 'Dose that kills half the test animals, in mg/kg. Lower is more toxic.'],
    ['LC50', 'Concentration in air or water that kills half the test animals.'],
    ['Risk', 'Toxicity x exposure.'],
    ['Acute vs chronic', 'Acute: from one short exposure. Chronic: from repeated exposure over time.']
  ] },
  { id: 'label', t: 'Label parts', cards: [
    ['EPA Reg. No.', 'Identifies the product. First part is the company, second is the product.'],
    ['EPA Est. No.', 'Identifies the factory.'],
    ['Must vs should', '"Must" and "do not" are legal requirements. "Should" is advice.'],
    ['Group number', 'Mode of action group, for resistance management.'],
    ['REI', 'Restricted-entry interval. Re-entry.'],
    ['PHI', 'Pre-harvest interval. For food crops.'],
    ['Precautionary Statements', 'Hazards to people and animals, PPE, user safety, environmental hazards.'],
    ['RUP', 'Restricted use pesticide. Certified applicators, or those under direct supervision.']
  ] },
  { id: 'virginia', state: 'va', t: 'Virginia numbers', cards: [
    ['Passing score', '76% on all Virginia exams.'],
    ['RT exam', '50 multiple-choice questions. 38 right to pass.'],
    ['RT training before the exam', '40 hours under direct on-site supervision.'],
    ['Records', 'Every application. Kept 2 years.'],
    ['Records request', 'If not readily available, submit within 72 hours of a written request.'],
    ['Accident phone notice', 'Not later than 48 hours.'],
    ['Accident written report', 'Within 10 working days of initial notice.'],
    ['Business license', '$75 per location per year. Expires March 31.'],
    ['Insurance minimums', '$100,000 property. $100,000 one person. $300,000 per occurrence.'],
    ['Service container exemption', 'End-use dilutions of 3 gallons or 3 pounds or less, used as application devices.'],
    ['Recertification', 'Every 2 years. Expires June 30. 60-day grace.'],
    ['Landlord notice', 'Written notice at least 48 hours before applying inside a unit.']
  ] },
  { id: 'wdo', t: 'WDO terms', cards: [
    ['B-E-S', 'Broad waist, Equal wings, Straight antennae = termite.'],
    ['Alate', 'Winged reproductive. A swarmer.'],
    ['Sill plate', 'Wood sitting on top of the foundation wall.'],
    ['Monolithic slab', 'Slab and footing poured together.'],
    ['Floating slab', 'Poured separately inside the foundation wall, leaving a joint.'],
    ['Supported slab', 'Rests on the foundation wall.'],
    ['Bath trap', 'Opening in the slab under a tub drain. A known way in.'],
    ['Continuous treated zone', 'The goal of a liquid termiticide job.'],
    ['Non-repellent', 'Termites cannot detect it. Passes by contact and grooming.'],
    ['Lyctid', 'Hardwood only. Pinhead holes. Talc-like frass.'],
    ['Anobiid', 'Hardwood and softwood. Gritty frass. Crawl space joists.'],
    ['Old house borer', 'Softwood. Oval holes. Mostly newer structures.'],
    ['Fiber saturation', 'About 25 to 30% wood moisture. Decay fungi need wood above it.'],
    ['Termidor HE rate', '2 gallons per 10 linear feet per foot of depth. Textbook classic is 4.'],
    ['Category 7C', 'Fumigation. Not part of 7B.']
  ] },
  { id: 'ninefold', t: 'Ninefold on the job (not on the exam)', cards: [
    ['Perimeter spray', '3 feet up and 3 feet out from the foundation.'],
    ['Yard reach', 'General Pest and Mosquito: out to 50 feet from the foundation.'],
    ['Granular band', '5 feet around the foundation. Spot treat the yard, never the entire yard.'],
    ['Interior baseboards', 'Including garage, only if the customer is home and requests it.'],
    ['De-web order', 'High pass, then low pass. Always before you spray.'],
    ['Termidor HE mix', '79 oz per 50 gallons.'],
    ['Termidor HE rate', '2 gallons per 10 linear feet per foot of depth.'],
    ['Drill holes', '1/2 inch, 12 to 18 inches apart. Never more than 18.'],
    ['Trench', '6 inches deep, 6 inches wide.'],
    ['Termite expectations', 'Give it 3 months to take full effect.'],
    ['Optiguard Flex for ants', '0.27 fl oz per gallon. 0.54 for heavy infestations. Per label.'],
    ['Ant timeline', 'Drops in 7 to 10 days. Resolves in about 2 weeks. No reapplication for 10 to 14 days unless it worsens.'],
    ['German roach kit', 'Non-repellent residual, gel bait, IGR like Gentrol, glue boards. Bait and residual stay apart.'],
    ['Appliances', 'Never move them. Have the customer move them.'],
    ['Nests and ladders', 'We do not use ladders. Ground reach with extension tools only, or escalate.'],
    ['Rain and mosquito', 'Do not fog. Refill or install In2Care. Fogging is not rescheduled.'],
    ['Pool buffer', '5 to 10 feet. Granules preferred.'],
    ['Fogging buffer', '20 to 30 feet.'],
    ['Dogs and cats', 'Confined to an untreated room for 1 hour after treatment, or longer if the label says so.'],
    ['Exclusion materials', 'Copper mesh and sealant, mortar, hardware cloth. No foam or standard caulk alone.'],
    ['Weep holes', 'Copper mesh only. Never mortar or sealant.'],
    ['Not in any package', 'German roaches, bed bugs, termites, weeds, voles, moles, snakes, birds.'],
    ['Daily truck check', 'SDS, fire extinguisher, first aid, spill kit, eye wash, change of clothes, instant soap.']
  ] }
];

NF.examInfo =
  '<div class="stack">' +
  '<section class="ticket"><div class="ticket__head"><span>Two tracks</span></div><table class="tbl"><thead><tr><th scope="col">Track</th><th scope="col">Exams</th></tr></thead><tbody>' +
  '<tr><th scope="row">Registered Technician</th><td>One 50-question exam built on the Core manual. After 40 hours of supervised training. Category 60.</td></tr>' +
  '<tr><th scope="row">Commercial Applicator</th><td>Core exam plus at least one category exam, like 7B. RT for 1 year or equivalent.</td></tr>' +
  '</tbody></table></section>' +
  '<section class="ticket"><div class="ticket__head"><span>The basics</span></div><table class="tbl"><tbody>' +
  '<tr><th scope="row">Pass mark</th><td>76% on all Virginia exams</td></tr>' +
  '<tr><th scope="row">RT deadline</th><td>Exam within 90 days of being hired or moved into pesticide work</td></tr>' +
  '<tr><th scope="row">Application fee</th><td>$25 for RT or Commercial</td></tr>' +
  '<tr><th scope="row">Authorization</th><td>Apply to VDACS first. Valid for one sitting, 90 days. Bring it and photo ID.</td></tr>' +
  '<tr><th scope="row">Manuals</th><td>Core 456-210. 7B 456-222. Print only, from Virginia Tech Pesticide Programs.</td></tr>' +
  '<tr><th scope="row">Failed?</th><td>New application and fee. Ask VDACS about the wait before retesting.</td></tr>' +
  '</tbody></table></section>' +
  '<section class="ticket"><div class="ticket__head"><span>Lawn & Ornamental</span><span>Confirm with VDACS</span></div><table class="tbl"><tbody>' +
  '<tr><th scope="row">Categories</th><td>3A Ornamental (shrubs, trees, flowers) and 3B Turf (lawns). Each is a category exam taken with Commercial Core.</td></tr>' +
  '<tr><th scope="row">Who needs it</th><td>Anyone applying pesticides to lawns or landscape plants for hire, including weed control.</td></tr>' +
  '<tr><th scope="row">Manuals</th><td>Category manuals from Virginia Tech Pesticide Programs. Ask which edition is current.</td></tr>' +
  '<tr><th scope="row">Not published</th><td>Question count and time limit. The practice mock here is 30 questions.</td></tr>' +
  '</tbody></table></section>' +
  '<section class="ticket"><div class="ticket__head"><span>Where to test</span></div><table class="tbl"><tbody>' +
  '<tr><th scope="row">DMV</th><td>Touch-screen at select centers on certain days. No extra fee. Scored as you take it.</td></tr>' +
  '<tr><th scope="row">Paper</th><td>By appointment with a VDACS investigator or testing center. No extra fee.</td></tr>' +
  '<tr><th scope="row">Remote</th><td>Online through Everblue, home or office. $27.58 plus $1.08 card fee per exam.</td></tr>' +
  '</tbody></table></section>' +
  '<section class="ticket"><div class="ticket__head"><span>Not published</span></div><div class="ticket__body stack"><p>VDACS does not publish these, so we won\'t guess. Ask before test day:</p>' +
  '<ul class="plain"><li>Question count for Commercial Core and 7B</li><li>Time limits</li><li>Open or closed book</li><li>Calculator policy</li></ul>' +
  '<p>VDACS testing questions: <span class="data">opsclrt.vdacs@vdacs.virginia.gov</span> or <span class="data">(804) 786-3798</span>.</p></div></section>' +
  '</div>';
