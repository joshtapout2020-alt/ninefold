/* Study modules. Written from research/core-content.md and research/wdo-content.md.
   `check:true` marks a card research could not confirm against the manual.
   Topic ids match `module` in the question banks. */
window.NF = window.NF || {};
NF.modules = [
  /* ===== CORE ===== */
  { id: 'laws', exam: 'core', state: 'va', title: 'Laws and rules', game: 'ticket',
    goal: 'Know who can spray what, and which Virginia duties have a clock on them.',
    ref: 'Virginia Core Manual 456-210. 2VAC5-680 and 2VAC5-685.',
    cards: [
      { h: 'The label is the law', b: 'FIFRA makes it a violation to use a pesticide in a way the label does not allow. Virginia says the same in § 3.2-3939. VDACS Office of Pesticide Services runs the program.' },
      { h: 'RT or Commercial', b: 'A Registered Technician can apply general-use products unsupervised. Restricted-use products need direct supervision by a certified commercial applicator.' },
      { h: 'Direct vs on-site', b: 'Direct supervision: acting under a certified applicator\'s instructions and control. Direct on-site: that applicator is on the property, in constant visual contact. Uncertified trainees need on-site.' },
      { h: 'Records', b: 'Every application, general use and restricted. Keep them 2 years. If a written request comes in and they are not on hand, you have 72 hours.' },
      { h: 'Accidents', b: 'Threat to a person or the environment? Report it, restricted-use or not. Phone within 48 hours. Written report within 10 working days.' },
      { h: 'Business license', b: 'Each location has its own. $75 a year, expires March 31. It is not an applicator certificate and does not authorize restricted-use products.' }
    ],
    traps: ['Records cover all applications, not just restricted-use.', 'Three different twos: 2 years for records, 2 years for recert, 2 years after revocation.', 'FIFRA 2(ee) never lets you raise a rate or add a site.'],
    aid: 'Forty-eight to phone, ten to write.',
    truck: 'Your service record lives in FieldRoutes. The Apruv recap video is for the customer, and it does not replace the service record. If a spill ever reaches a storm drain, it must be reported, even when the product is general use.' },

  { id: 'labels', exam: 'core', title: 'Reading the label', game: 'label',
    goal: 'Find any fact on a label fast, and know what each part really tells you.',
    ref: 'Virginia Core Manual 456-210. 40 CFR 156.64.',
    cards: [
      { h: 'Signal words', b: 'DANGER, WARNING, CAUTION, loud to quiet. They reflect acute toxicity of the finished product. Not chronic risk. Not environmental hazard.' },
      { h: 'Oral LD50 bands', b: 'Up to 50 mg/kg: DANGER. Over 50 to 500: WARNING. Over 500 to 5,000: CAUTION. Over 5,000: no signal word required.' },
      { h: 'Skull and crossbones', b: 'DANGER plus POISON and the skull go on when Category I comes from oral, inhalation or dermal toxicity. A DANGER from eye or skin damage has no skull.' },
      { h: 'Reg vs Est', b: 'EPA Reg. No. is the product. Termidor HE is 7969-329: company, then product. EPA Est. No. is the factory.' },
      { h: 'Must vs should', b: '"Must" and "do not" are legal requirements. "Should" and "recommend" are advice. Read which one you have.' },
      { h: 'Label layout', b: 'First Aid. Precautionary Statements: hazards, PPE, user safety, environmental. Directions for Use. Storage and Disposal. Warranty.' }
    ],
    traps: ['The signal word goes with the product, not the active ingredient.', 'REI is re-entry. PHI is pre-harvest.', 'Same active, different product, different label.'],
    aid: 'Danger, Warning, Caution: D W C, loud to quiet. Lower LD50, higher hazard.',
    truck: 'Every Ninefold SOP comes back to one rule: follow the label. For example, the Termidor HE label says it is not for general pest control. If a customer asks you to spray spiders on a termite job, use your general pest product instead. Keep the SDS binder or QR code on the truck.' },

  { id: 'formulations', exam: 'core', title: 'Formulations', game: 'suspended',
    goal: 'Know how each product acts in water, and the handling step that goes with it.',
    ref: 'Virginia Core Manual 456-210. VT BSE-351 for mixing order.',
    cards: [
      { h: 'Dissolve or disperse', b: 'Soluble products (SG, SP) form a true solution. Agitate to dissolve, then they stay. Dispersible products (WG, WP, flowables) only hang in the water and settle if it goes still.' },
      { h: 'Why it matters', b: 'A settled tank sprays thin first and hot last. Same jug, wrong rate both ways.' },
      { h: 'Dry on arrival', b: 'Granules (G) go on dry and never in a sprayer. Dusts stay dry too. Baits are used as they come.' },
      { h: 'Packets', b: 'A water-soluble packet (WSP) dissolves. What is inside may not. Read what is in the packet.' },
      { h: 'Exposure', b: 'Dust: high inhalation and drift hazard. WP: inhalation, and it wears pumps. WDG: less dust. SP: inhalation while mixing.' }
    ],
    traps: ['G and WG are not the same thing.', 'Dust never goes in water. WP always does.', 'Letter codes vary. Read the full words.'],
    aid: 'Clear stays, cloudy strays.',
    truck: 'Termidor HE is a suspension that settles, and its jug says Shake Well. Let the rig run and recirculate until it is fully mixed. Agitate your Optiguard Flex ant backpack often while you spray. On rain days you lean on granules, which go on dry, straight from the bag. If your tank looks cloudy, keep it moving.' },

  { id: 'moa-resistance', exam: 'core', title: 'Modes of action and resistance', game: null,
    goal: 'Tell how a product kills from how it gets in, and keep resistance from building.',
    ref: 'Virginia Core Manual 456-210.',
    cards: [
      { h: 'Mode vs route', b: 'Mode of action is how it kills. Route of entry is how it gets in: contact, stomach, or inhalation for a fumigant.' },
      { h: 'Word pairs', b: 'Residual or contact. Selective or non-selective. Pre-emergent or post-emergent. Repellent or non-repellent. Each pair is its own question.' },
      { h: 'IGR and CSI', b: 'An IGR disrupts development. A chitin synthesis inhibitor is a type of IGR. Novaluron in Trelona stops molting.' },
      { h: 'Resistance', b: 'It happens in a population, through selection pressure. Survivors breed. It is not one bug getting used to it.' },
      { h: 'Managing it', b: 'Rotate by group number, use IPM, stay at label rates. Common groups: 2B fipronil, 3A pyrethroids, 4A neonicotinoids, 15 novaluron-type, 22A indoxacarb. Check the label.', check: true }
    ],
    traps: ['Rotating brands does nothing if the group stays the same.', 'Non-selective does not mean non-residual.', 'Sub-label doses do not help.'],
    aid: 'Rotate the group, not the logo.',
    truck: 'For German roaches you carry a non-repellent spray, gel bait, and a growth regulator such as Gentrol. For ants you use Optiguard Flex and Alpine WSG. Both are non-repellent, so ants carry them back to the colony. Never spray where you put bait. If roaches stop eating one bait, switch to a different one.' },

  { id: 'ipm', exam: 'core', title: 'Integrated Pest Management', game: null,
    goal: 'Run the four IPM steps and reach for the right tactic.',
    ref: 'Virginia Core Manual 456-210. EPA IPM Principles.',
    cards: [
      { h: 'Four steps', b: 'Set action thresholds. Monitor and identify. Prevent. Control.' },
      { h: 'Tactics', b: 'Cultural: sanitation, habitat. Mechanical or physical: exclusion, traps, vacuum. Biological. Chemical.' },
      { h: 'Identify first', b: 'Ninefold says it plainly: we identify first. Wrong ID means wrong plan.' },
      { h: 'Thresholds', b: 'The level of pest where action is justified. In food and healthcare, that can be zero.' },
      { h: 'Exclusion numbers', b: 'A mouse needs about 1/4 inch. A rat about 1/2 inch.' }
    ],
    traps: ['IPM does not mean no pesticides. It means chosen and targeted.', 'Monitoring is not control.', 'Sanitation is cultural. Exclusion is physical.'],
    aid: 'Threshold, Monitor, Prevent, Control. At Ninefold: Inspect, Protect, Prove.',
    truck: 'On every Ninefold visit, inspect before you treat. Walk the property and look for pest activity, the ways pests get in, and anything that attracts them. Then treat only what you found. Example: you find mouse droppings in a restaurant kitchen. Find the gap they come through, set snap traps in pairs, and tell the manager about any cleanliness problems.' },

  { id: 'toxicity', exam: 'core', title: 'Toxicity and first aid', game: null,
    goal: 'Read LD50 and LC50, and give the right first aid.',
    ref: 'Virginia Core Manual 456-210. EPA Recognition and Management of Pesticide Poisonings.',
    cards: [
      { h: 'Risk', b: 'Risk = toxicity x exposure. Toxicity is how poisonous the product is. Exposure is how much gets on or in you. You cannot change the toxicity, but PPE and good handling cut your exposure.' },
      { h: 'LD50 and LC50', b: 'LD50 is the dose killing half the test animals, in mg/kg. LC50 is concentration in air or water. Lower number, more toxic. Acute only.' },
      { h: 'Routes', b: 'Dermal, ocular, inhalation, ingestion. Skin is generally the most common route on the job.', check: true },
      { h: 'First aid', b: 'Follow the label. Typical: skin and eyes, rinse 15 to 20 minutes. Swallowed, call poison control first. Do not induce vomiting unless told to.' },
      { h: 'Who to call', b: 'Poison Control 1-800-222-1222. NPIC 800-858-7378 for questions. 911 for a life threat. Take the label with you.' },
      { h: 'Heat or poison?', b: 'Heat stress and pesticide exposure look alike. If in doubt, stop work, get out, and get medical care.' }
    ],
    traps: ['Vomiting is never the default.', 'Lower LD50 is worse.', 'Symptoms can be delayed.', 'Antidotes are for medical staff only. Many products have none.'],
    aid: 'Fifteen to twenty for skin and eyes. Bring the label.',
    truck: 'Your truck carries an eye wash, a first aid kit, instant soap, a change of clothes and the SDS. If concentrate splashes in your eye, flush it for 15 to 20 minutes first. Then call Poison Control with the label in your hand.' },

  { id: 'ppe', exam: 'core', title: 'Personal protective equipment', game: 'ppe',
    goal: 'Read PPE off a label, then take it off and clean it right.',
    ref: 'Virginia Core Manual 456-210. Termidor HE label, EPA Reg. No. 7969-329.',
    cards: [
      { h: 'The label sets the minimum', b: 'Whatever the label lists is your floor. More is fine. Less is a violation.' },
      { h: 'Termidor HE example', b: 'Long sleeves, long pants, shoes, socks, waterproof gloves. Add a particulate respirator as listed in crawl spaces and basements. Add eyewear there, or when rodding or sub-slab injecting.' },
      { h: 'Gloves', b: 'Labels name material and thickness. Leather and cotton soak it up. Wash gloves before you take them off.', check: true },
      { h: 'After the job', b: 'Take PPE off right after handling. Wash up and change. Launder separately from family clothes, hot water and detergent.' },
      { h: 'Heat', b: 'PPE adds heat. Schedule heavy PPE work for the coolest part of the day.' }
    ],
    traps: ['Mixing PPE can differ from application PPE. Concentrate is the highest exposure.', 'A dust mask is not automatically NIOSH-approved.', '"Shoes" and "chemical-resistant footwear" are different.'],
    aid: 'Gloves come off last, washed first.',
    truck: 'At Ninefold, gloves, safety glasses, long sleeves, pants and boots go on before every job. The label can add more. For example, Termidor HE in a crawl space adds a respirator. Wasp and hornet work adds a veil or hood.' },

  { id: 'handling', exam: 'core', title: 'Mixing, storage, transport', game: 'suspended',
    goal: 'Mix and load without hitting people or water. Store and haul it legally.',
    ref: 'Virginia Core Manual 456-210. 2VAC5-670-150, -170, -210.',
    cards: [
      { h: 'Mixing is peak exposure', b: 'Pour below face level. Stand upwind. Never leave a filling tank.', check: true },
      { h: 'Backflow', b: 'Keep an air gap, or use an anti-backflow device. The hose end never goes below the water line.' },
      { h: 'Tank order', b: 'The label comes first. If it is silent: water and agitation, wettables and dry, agitate, liquid flowables, emulsifiables, surfactants. That is WALES.' },
      { state: 'va', h: 'Service containers', b: 'Anything other than the original container needs a label in Virginia. Dilutions of 3 gallons or less, used as application devices, are exempt.' },
      { h: 'Storage', b: 'Locked, dry, ventilated, away from food, in the original container. A common rule of thumb is 40 to 100°F. Follow the label.' },
      { h: 'Transport', b: 'Never in the passenger compartment. Secure it. Never with food or feed. Carry a spill kit and PPE.' }
    ],
    traps: ['Heat is a storage problem. A hot truck cab counts.', 'Never refill a labeled jug with something else.', 'Food containers are never okay.'],
    aid: 'Label, Lock, Level, Load out.',
    truck: 'Check your mix rate before you spray, at every stop. Keep the chemical box locked and organized. Turn in triple-rinsed empty containers before you check out new product. When you fill from an outdoor faucet, keep the end of the hose above the tank so nothing siphons back.' },

  { id: 'spills-disposal', exam: 'core', title: 'Spills and disposal', game: 'spill',
    goal: 'Run a spill in the right order. Rinse and get rid of containers right.',
    ref: 'Virginia Core Manual 456-210. 2VAC5-670-160, 2VAC5-685-170.',
    cards: [
      { h: 'Three Cs', b: 'Protect yourself first. Control: stop the source. Contain: dike with absorbent. Clean up: into containers for disposal.' },
      { state: 'va', h: 'Report', b: 'Threat to a person or the environment? Phone OPS within 48 hours. Written report within 10 working days.' },
      { h: 'Triple rinse', b: 'Drain 10 seconds after it starts to drip. Fill 1/4 with water, cap, shake 10 seconds. Pour rinsate in the tank. Drain 10 seconds. Twice more.' },
      { h: 'Rinsate', b: 'It goes in the spray tank or a labeled site. Never down a drain.' },
      { h: 'Leftovers', b: 'Best disposal is using it up by labeled application. Otherwise follow the label and your state or local waste program.' }
    ],
    traps: ['Never hose a spill down. Water spreads it.', 'Never reuse a container.', 'A small spill still counts if it threatens people or water.'],
    aid: 'Control, Contain, Clean up, Call.',
    truck: 'Your spill kit rides on the truck, and you park away from storm drains for exactly this reason. Example: a jug cracks in the truck bed. Put on your PPE, stop the leak, soak it up with absorbent, bag it, and tell your manager right away.' },

  { id: 'environment', exam: 'core', title: 'Environment', game: null,
    goal: 'Explain where pesticides go and how to keep them on target.',
    ref: 'Virginia Core Manual 456-210. pesticidestewardship.org.',
    cards: [
      { h: 'Four ways out', b: 'Drift moves through the air. Vapor forms after application. Runoff moves across the surface. Leaching moves down through soil.' },
      { h: 'Wind', b: 'With no label direction, a common guide is 3 to 8 mph, blowing away from anything sensitive. Dead calm may mean an inversion.' },
      { h: 'Inversion', b: 'Cool air trapped under warm air. Signs: fog in low spots, smoke rising then moving sideways, dust hanging.' },
      { h: 'Droplet size', b: 'Bigger droplets drift less. Lower pressure, larger nozzle, closer to the target.' },
      { h: 'Water', b: 'Do not apply during rain, or on saturated or frozen soil, when the label says so. Keep sprays out of storm drains. Sweep granules off hard surfaces.' },
      { h: 'Bees', b: 'Read the Environmental Hazards section. Avoid bloom. Dusk or dawn lowers risk. Neonicotinoid labels carry a Pollinator Protection box.' }
    ],
    traps: ['Adsorption binds to soil. Absorption soaks in.', 'Drift is during. Volatilization is after.', 'Calm air is not automatically safe.'],
    aid: 'Run across, leach down, drift away, vapor later.',
    truck: 'Keep a 5 to 10 foot buffer around pools, and use granules there when you can. Keep a 20 to 30 foot buffer when fogging. Do not treat near ponds or docks unless the label allows it. Never fog in rain or high wind. In the rain, spray only areas that are dry, and never spray soaked surfaces.' },

  { id: 'equipment', exam: 'core', title: 'Equipment and calibration', game: 'math',
    goal: 'Keep equipment sound and calibrate a sprayer.',
    ref: 'Virginia Core Manual 456-210. 2VAC5-670-170.',
    cards: [
      { state: 'va', h: 'Legal minimum', b: 'Equipment must be in sound condition, deliver the right amount, not leak, have cut-off valves, and have backflow prevention on fill hoses.' },
      { h: 'Calibrate with water', b: 'Use the same speed, pressure and technique as the job.' },
      { h: 'Backpack method', b: 'Mark 1,000 sq ft. Time yourself spraying it. Spray into a container for that same time. Ounces collected = ounces per 1,000 sq ft.' },
      { h: 'Nozzles', b: 'Worn nozzles put out more. Recalibrate after any nozzle change.', check: true },
      { h: 'Pressure', b: 'More pressure means finer droplets and more drift. Termidor HE says 25 PSI or less on soil surfaces.' }
    ],
    traps: ['Pressure up does not make coverage even.', 'Output depends on nozzle, pressure and speed.'],
    aid: 'Same pace, same pressure, same person.',
    truck: 'If your B&G sprayer will not spray, check the pressure, the nozzle, the canister and the filter in the handle. For a backpack sprayer, check the battery, the lid seal and the pump. For a fogger, check the gas, the valve and for clogs. Still stuck? Call your manager. Any time you change a nozzle, recalibrate.' },

  { id: 'math', exam: 'core', title: 'Pesticide math', game: 'math',
    goal: 'Work area, tank load and dilution problems without losing the units.',
    ref: 'Virginia Core Manual 456-210. The label table is the authority.',
    cards: [
      { h: 'Numbers to know', b: '1 gallon = 128 fl oz = 4 quarts = 8 pints. 1 pound = 16 oz. 1 acre = 43,560 sq ft.' },
      { h: 'Area', b: 'Rectangle: L x W. Triangle: 1/2 x base x height. Circle: 3.14 x r x r.' },
      { h: 'Product needed', b: 'Rate per 1,000 sq ft x (area / 1,000). 1.5 fl oz per 1,000 on 4,000 sq ft: 4 x 1.5 = 6 fl oz.' },
      { h: 'Tank coverage', b: 'Tank gallons x 1,000 / gallons per 1,000 sq ft. Output 1 gal per 1,000, 3-gallon tank: 3,000 sq ft.' },
      { h: 'Rate per gallon', b: 'Label says 0.8 fl oz per gallon, 25 gallons: 25 x 0.8 = 20 fl oz.' }
    ],
    traps: ['Convert before you multiply.', 'Fl oz is volume. Oz is weight.', '1 gal per 1,000 sq ft is not 1 gal per 10 linear feet.'],
    aid: 'Units first. If the units don\'t cancel, the answer\'s wrong.',
    truck: 'You will do this math every day. Termidor HE mixes at 79 oz per 50 gallons, so 25 gallons takes 39.5 oz. Optiguard Flex mixes at 0.27 fl oz per gallon, so a 4-gallon backpack takes 1.08 fl oz. Labels round their mixing tables, and the label table is always the final word.' },

  /* ===== WDO 7B ===== */
  { id: 'termite-biology', exam: 'wdo', title: 'Termite biology', game: 'bugid',
    goal: 'Name the castes, how a colony lives, and who lives in Virginia.',
    ref: 'Management of Wood-Destroying Organisms 456-222.',
    cards: [
      { h: 'Who is who', b: 'Workers feed the colony and do the damage. Soldiers defend. Reproductives: primary king and queen, alates, and secondary neotenics.' },
      { h: 'What they need', b: 'Cellulose and moisture. Soft bodies dry out, so mud tubes keep them humid. Colonies usually live in soil.' },
      { h: 'Virginia species', b: 'Eastern subterranean, Reticulitermes flavipes, is the main pest statewide.' },
      { h: 'Formosan watch', b: 'Reported in Norfolk in 2022 from a commercial attic. Establishment not confirmed. Teardrop soldier head and tan hairy-winged alates. Send suspect samples through Extension.', check: true },
      { h: 'Aerial colonies', b: 'If moisture sits above ground, a colony can live there. Soil treatment alone will not control that.' }
    ],
    traps: ['Workers cause the damage, not swarmers.', 'Termites have a king and queen. Ants have a queen only.', 'Formosan is a subterranean termite.', 'Swarmers indoors usually mean infestation. Outdoors, not proof.'],
    aid: 'Workers Work, Soldiers Stand, Swarmers Start.',
    truck: 'Example: a customer near the coast sends a video of tan termite swarmers flying at dusk in June. Collect samples. If the soldiers have teardrop-shaped heads, they could be Formosan termites, so send them to the Extension office to be identified.' },

  { id: 'swarmers-id', exam: 'wdo', title: 'Swarmers and look-alikes', game: 'bugid',
    goal: 'Tell a termite swarmer from an ant swarmer on sight.',
    ref: 'Management of Wood-Destroying Organisms 456-222.',
    cards: [
      { h: 'Termite swarmer', b: 'Broad waist. Two pairs of wings, equal length. Straight, beadlike antennae.' },
      { h: 'Ant swarmer', b: 'Pinched waist. Front wings larger than hind wings. Elbowed antennae.' },
      { h: 'Wing piles', b: 'Termites shed wings easily. Piles on a windowsill are evidence.' },
      { h: 'Timing', b: 'Spring is peak call time, but other months happen. Warm days after rain are typical.', check: true }
    ],
    traps: ['Ants and termites can swarm at the same time.', 'Save the sample. Do not guess from a phone call.'],
    aid: 'B-E-S: Broad, Equal, Straight = termite.',
    truck: 'Example: a homeowner saves some flying bugs on tape. Under a magnifier, they have a pinched waist and front wings longer than the back wings. That makes them ants, not termites.' },

  { id: 'conducive', exam: 'wdo', title: 'Conducive conditions', game: 'walk',
    goal: 'Spot what invites wood-destroyers and say how to fix it.',
    ref: 'Management of Wood-Destroying Organisms 456-222.',
    cards: [
      { h: 'Wood', b: 'Wood-to-soil contact, firewood on the foundation, form boards left in place, stumps, debris in the crawl.' },
      { h: 'Water', b: 'Leaking gutters and pipes, poor grading, damp crawl spaces.' },
      { h: 'Way in', b: 'Mulch against siding, earth-filled porches, hollow block, cracks.' },
      { h: 'Fix moisture first', b: 'Especially for aerial infestations and fungi. Treatment does not remove the condition.' }
    ],
    traps: ['Treatment does not fix a conducive condition.', 'Mulch is a contributor, not the whole cause.'],
    aid: 'Water, Wood, Way in.',
    truck: 'Example: a planter box sits right against the siding. Write it down in your notes, and explain to the customer how to fix it, such as moving it away from the house.' },

  { id: 'other-wdi', exam: 'wdo', title: 'Other wood-destroying insects', game: 'bugid',
    goal: 'Identify carpenter ants, carpenter bees and wood-boring beetles.',
    ref: 'Management of Wood-Destroying Organisms 456-222.',
    cards: [
      { h: 'Carpenter ants', b: 'They do not eat wood. They excavate nests. Frass is shavings and insect parts. Galleries are clean and smooth and cross the grain. Find the parent and satellite nests, fix moisture.' },
      { h: 'Carpenter bees', b: 'Shiny black abdomen. A bumble bee\'s is hairy. Females cut 1/2-inch round holes, then tunnel along the surface. A native pollinator, so think before treating.' },
      { h: 'Lyctid', b: 'Hardwoods only. Pinhead holes. Talc-like frass. New flooring, trim, furniture.' },
      { h: 'Anobiid', b: 'Hardwood and softwood. Holes 1/16 to 1/8 inch. Gritty frass. Crawl space joists.' },
      { h: 'Bostrichid', b: 'Mostly hardwood. Fresh, high-moisture wood. Sawdust frass, tightly packed.' },
      { h: 'Old house borer', b: 'Softwood sapwood only. Oval holes 1/4 to 3/8 inch. Mostly newer structures on the Atlantic Seaboard.' }
    ],
    traps: ['"Old house borer" prefers newer structures.', 'Holes alone do not prove activity. Adults leaving made them.', 'Lyctids are not a joist pest.'],
    aid: 'Lyctid: Like talc, Luxury hardwood. Anobiid: Attic to crawl, Any wood. Old house, young wood.',
    truck: 'Example: you find tiny round holes and gritty powder on pine joists in a crawl space, and the wood reads 18% moisture. That is most likely an anobiid beetle. Fixing the moisture comes first.' },

  { id: 'decay-moisture', exam: 'wdo', title: 'Wood decay and moisture', game: null,
    goal: 'Know the moisture numbers and what decay needs.',
    ref: 'Management of Wood-Destroying Organisms 456-222. USDA Forest Products Lab.',
    cards: [
      { h: 'The numbers', b: 'Decay fungi need wood above fiber saturation, about 25 to 30%. 20% is the design safety margin. 20 to 30% is a gray area.' },
      { h: 'Beetles', b: 'Wood under 15% with humidity below 60% in the warm season is unsuitable for many wood-borers.' },
      { h: 'Moisture service', b: 'Ninefold\'s target is humidity under 60%. Vapor barrier over the soil, source repair, ventilation or encapsulation.' },
      { h: 'Rot types', b: 'Brown rot, white rot, soft rot. Water-conducting fungus can move water.', check: true },
      { h: 'Reports', b: 'Mold and fungi are not on the NPMA-33.' }
    ],
    traps: ['20% is not where decay starts.', '30% is not a hard line.', 'Staining mold is not always structural decay.'],
    aid: '15 bugs hate less, 20 stay safe, 30 rot\'s the risk.',
    truck: 'Example: a floor joist next to a bathtub drain reads 26% moisture. Find and fix the leak before anything else.' },

  { id: 'construction', exam: 'wdo', title: 'Building construction', game: 'foundation',
    goal: 'Name the parts of a structure and where termites get in.',
    ref: 'Management of Wood-Destroying Organisms 456-222.',
    cards: [
      { h: 'Bottom to top', b: 'Footing, foundation wall, sill plate, band joist, floor joists, subfloor.' },
      { h: 'Slabs', b: 'Monolithic: slab and footing poured together. Floating: slab poured inside the wall, leaving a joint. Supported: slab rests on the wall.', check: true },
      { h: 'Ways in', b: 'Expansion joints, cracks, pipe openings, hollow block voids, soil-contact wood, earth-filled porches, bath traps.' },
      { h: 'Crawl spaces', b: 'Termidor HE separates accessible and inaccessible crawl spaces. Know which you have.' }
    ],
    traps: ['Sill plate sits on the foundation. Joists sit on the sill.', 'Monolithic has no interior slab-wall joint in the classic drawing. Floating does.'],
    aid: 'Foot, Found, Sill, Joist, Sub.',
    truck: 'Example: a 1960s house has a crawl space with a hollow concrete block foundation. Termites can travel up the hollow spaces inside the blocks, so those spaces may need treatment as the label directs.' },

  { id: 'treatment', exam: 'wdo', title: 'Treatment methods', game: 'foundation',
    goal: 'Pick and describe trenching, rodding, drilling, baits and wood treatment.',
    ref: 'Management of Wood-Destroying Organisms 456-222. Termidor HE and Trelona labels.',
    cards: [
      { h: 'Continuous treated zone', b: 'The goal of a liquid job. That is label language. Avoid saying "barrier".' },
      { h: 'Repellent vs non-repellent', b: 'Non-repellents like fipronil go undetected and pass by contact and grooming. Repellents like pyrethroids push termites away, so gaps are a weak point.' },
      { h: 'Before you drill', b: 'Locate ducts, pipes and wiring. Check there is no living space below. Plug holes with non-cellulose material. Check for leaks before you leave.' },
      { h: 'Water limits on HE', b: 'Wells and cisterns: none within 10 ft, backfill only 10 to 15 ft. French drains: do not rod within 48 inches. No rain, saturated or frozen soil.' },
      { h: 'Baits', b: 'Trelona ATBS uses novaluron. Workers feed and share, molting stops, the colony declines. Not a quick fix. Stations stay flush and get inspected.' },
      { h: 'Borates and fumigation', b: 'Borates go on bare wood, not sealed wood. Fumigation is Category 7C, not 7B.' }
    ],
    traps: ['Never treat below the footing.', 'Bait stations are not set and forget.', 'Rodding alone only where there is no alternative.'],
    aid: 'Locate, Layout, Low pressure, Leak check, Log.',
    truck: 'Here is how Ninefold does a liquid termite job. Drill 1/2 inch holes 12 to 18 inches apart through concrete. Dig a trench 6 inches deep and 6 inches wide in the soil. Treat each drill hole for 10 seconds, and rod the trench every 1 to 2 feet. Then plug and patch the holes. Use Termidor Foam for spots inside. Tell the customer to give it 3 months to fully work.' },

  { id: 'termite-math', exam: 'wdo', title: 'Termiticide math', game: 'foundation',
    goal: 'Work out gallons, and never mix up the textbook rate with the truck rate.',
    ref: 'Termidor HE label, EPA Reg. No. 7969-329. Management of Wood-Destroying Organisms 456-222.',
    cards: [
      { h: 'The formula', b: 'Gallons = (linear feet / 10) x gallons per 10 lf x depth in feet.' },
      { h: 'Textbook vs truck', b: 'The classic rate is 4 gallons per 10 linear feet per foot of depth. Termidor HE is 2. The label on your truck is the law.' },
      { h: 'HE depth rule', b: 'Footing over 2 ft below grade? Treat to a minimum of 2 ft. So 200 lf with a 3 ft footing: 20 x 2 x 2 = 80 gallons minimum.' },
      { h: 'Horizontal', b: '1 to 1.5 gallons per 10 sq ft. 1,000 sq ft at 1 gal/10 sq ft = 100 gallons.' },
      { h: 'Rod holes', b: 'HE spacing max is 18 inches. 30 ft x 12 / 18 = 20 holes. Gallons per hole = total / holes.' }
    ],
    traps: ['Read "per foot of depth" every time.', 'Linear feet and square feet are different jobs.', 'If a question names a product, use that label.'],
    aid: 'Name the product. Then do the math.',
    truck: 'Ninefold mixes Termidor HE at 79 oz per 50 gallons. That matches the label table of 158 fl oz per 100 gallons. So a job that needs 80 gallons takes 126.4 oz.' },

  { id: 'inspection', exam: 'wdo', title: 'Inspection and reports', game: 'walk',
    goal: 'Run an inspection and report only what you can see.',
    ref: 'NPMA-33 Suggested Guidelines v1.3. Management of Wood-Destroying Organisms 456-222.',
    cards: [
      { h: 'Tools', b: 'Flashlight, probe, moisture meter, ladder, PPE for the crawl, sample vials, measuring wheel.', check: true },
      { h: 'Method', b: 'Sound and probe accessible wood. Check structure, crawl, attic, exterior and conditions. Break a mud tube. Empty does not mean gone.' },
      { h: 'NPMA-33 scope', b: 'Termites, carpenter ants, carpenter bees, reinfesting wood-boring beetles. Visible evidence, on the date of inspection. No warranty unless attached.' },
      { h: 'Findings', b: 'No visible evidence only applies if there is none, past or present. Otherwise: live insects, dead insects and signs, visible damage. You can check more than one.' },
      { h: 'Limits', b: 'You are not a damage expert. It is not a structural report. Fungus is not on it. Attached decks count as part of the structure.' }
    ],
    traps: ['Live insects are not required to recommend treatment.', 'The inspector does not collect buyer and seller signatures.', 'If papers arrive later, do not change the report. Tell the lender.'],
    aid: 'See it, say it, sign it. Don\'t guess it.',
    truck: 'Before you start, read the termite graph and the appointment card. They show where activity was found and which walls to drill or trench. Knock down any mud tubes you see, so new ones stand out later. A mud tube on an attached deck counts as evidence, because the deck is part of the structure.' }
];
