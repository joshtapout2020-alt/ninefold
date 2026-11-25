/* One direct question per Study card, in the same order as each module's cards in modules.js.
   Every fact comes from that card. Each question stands on its own: full sentences, terms explained.
   Shape: [question, [choices], answer index, [why each choice is wrong, null for the right one]] */
window.NF = window.NF || {};
/* What each stop's memory trick means, shown under it on the "Memory trick" card. */
NF.aidWhy = {
  laws: 'After an accident, call it in within 48 hours. File the written report within 10 working days.',
  labels: 'Signal words run from most to least toxic: DANGER, WARNING, CAUTION. A lower LD50 means a smaller dose kills, so the product is more hazardous.',
  formulations: 'A clear tank is a solution. It stays mixed. A cloudy tank is a suspension. It settles if you stop agitating.',
  'moa-resistance': 'Switching brands does nothing if the group number is the same. To fight resistance, change the group.',
  ipm: 'The four IPM steps, in order. Ninefold\'s version of the same idea is Inspect, Protect, Prove.',
  toxicity: 'Flush skin or eyes for 15 to 20 minutes. Bring the label to the doctor.',
  ppe: 'Wash your gloves before you take them off, and take them off last, so your hands stay clean.',
  handling: 'Read the label, keep it locked, keep containers level and secured, then load out.',
  'spills-disposal': 'Stop the source, keep it from spreading, clean it up, then make the call.',
  environment: 'Runoff moves across the ground. Leaching moves down through the soil. Drift moves through the air while you spray. Vapor forms after.',
  equipment: 'Calibrate at the same walking pace, the same pressure, and with the same person as the real job.',
  math: 'Write the units on every number. If they do not cancel out to what you need, the math is wrong.',
  'termite-biology': 'Workers do the damage. Soldiers defend the colony. Swarmers fly off to start new colonies.',
  'swarmers-id': 'A termite swarmer has a Broad waist, Equal-length wings and Straight antennae.',
  conducive: 'Water, wood contact and ways in are the three things that invite wood-destroying pests.',
  'other-wdi': 'Lyctids leave talc-like frass in hardwood. Anobiids hit any wood, often from attic to crawl space. Old house borers actually prefer newer homes.',
  'decay-moisture': 'Under 15% moisture, many wood-boring beetles cannot use the wood. 20% is the safety margin. Around 30% is where decay becomes a risk.',
  construction: 'From the ground up: footing, foundation wall, sill plate, joists, subfloor.',
  treatment: 'Locate utilities, lay out the job, keep pressure low, check for leaks, and log what you did.',
  'termite-math': 'Check which product the question names before you pick a rate. The textbook rate is 4 gallons. Termidor HE is 2.',
  inspection: 'Report only what you can see, sign your name to it, and never guess.'
};
NF.cardQuiz = {
  laws: [
    ['Can you use a pesticide in a way its label does not allow?', ['Yes, if the job needs it', 'No. It breaks federal (FIFRA) and Virginia law', 'Yes, if it is a general-use product'], 1, ['The job never overrides the label.', null, 'The rule covers every product, general use included.']],
    ['A Registered Technician wants to apply a restricted-use product. What do they need?', ['Nothing. RTs can apply anything', 'Direct supervision by a certified commercial applicator', 'A business license'], 1, ['RTs apply general-use products on their own, not restricted-use.', null, 'A business license does not allow restricted-use products.']],
    ['Under "direct on-site supervision", where must the certified applicator be?', ['Reachable by phone', 'On the property, in constant sight of the person applying', 'At the branch office'], 1, ['Being reachable by phone is the looser "direct supervision" standard.', null, 'The office is not on the property.']],
    ['Which pesticide applications need a written record in Virginia, and for how long?', ['Every application, kept 2 years', 'Restricted-use applications only', 'Only ones the customer asks about'], 0, [null, 'General-use applications need records too.', 'Records are required whether anyone asks or not.']],
    ['An accident puts people or the environment at risk. How soon must you report it by phone?', ['Within 10 working days', 'Within 48 hours', 'Only if a restricted-use product was involved'], 1, ['10 working days is the deadline for the written report.', null, 'You report it whether or not the product is restricted-use.']],
    ['What does a Virginia pesticide business license allow?', ['Running a pest business at that location', 'Applying restricted-use products', 'Skipping applicator certification'], 0, [null, 'It does not allow restricted-use products.', 'It is not an applicator certificate.']]
  ],
  labels: [
    ['Which signal word on a label means the product is the most acutely toxic?', ['CAUTION', 'WARNING', 'DANGER'], 2, ['CAUTION is the least toxic of the three.', 'WARNING is the middle level.', null]],
    ['LD50 is the dose that kills half of test animals. A product\'s oral LD50 is 300 mg/kg. Which signal word goes on its label?', ['WARNING', 'DANGER', 'CAUTION'], 0, [null, 'DANGER is for an LD50 of 50 mg/kg or less.', 'CAUTION starts above 500 mg/kg.']],
    ['A product is labeled DANGER only because it can damage your eyes. Does it get the skull and crossbones?', ['Yes', 'No'], 1, ['The skull goes on only when DANGER comes from swallowing, breathing or skin toxicity.', null]],
    ['What does the EPA Registration Number (EPA Reg. No.) on a label identify?', ['The factory that made it', 'The product', 'The active ingredient'], 1, ['That is the EPA Establishment Number.', null, 'The ingredient list names the actives.']],
    ['A label says you "should" wear goggles. What does "should" mean on a label?', ['It is a legal requirement', 'It is advice', 'It only applies to restricted-use products'], 1, ['"Must" and "do not" are requirements. "Should" is advice.', null, 'The word means the same on any label.']],
    ['Which section of a label tells you what PPE to wear?', ['Precautionary Statements', 'Storage and Disposal', 'Ingredient Statement'], 0, [null, 'That section covers storing and getting rid of the product.', 'That section only lists ingredients.']]
  ],
  formulations: [
    ['Which formulation fully dissolves in water to make a true solution?', ['Wettable powder (WP)', 'Soluble granule (SG)', 'Flowable (F)'], 1, ['A WP only hangs in the water and settles without agitation.', null, 'A flowable is a suspension. It settles too.']],
    ['A tank of water-dispersible granules (WG) sits still for 10 minutes. What happens when you start spraying?', ['The first spray is weak and the last is too strong', 'Every spray comes out even', 'The first spray is too strong and the last is weak'], 0, [null, 'Settled particles make the rate uneven.', 'Product sinks to the bottom first, so early spray is weak.']],
    ['How do you apply a granule (G) product?', ['Mix it in the sprayer with water', 'Spread it dry. It never goes in a sprayer', 'Run it through a fogger'], 1, ['Granules are applied dry. Mixing them with water is the trap.', null, 'Granules are spread, not fogged.']],
    ['A water-soluble packet dissolves in the tank. Does the product inside dissolve too?', ['Yes, always', 'Not always. It may only disperse, so read the label', 'It never needs agitation either way'], 1, ['The packet melting says nothing about what is inside.', null, 'If the contents only disperse, they still need agitation.']],
    ['Which formulation is most likely to be breathed in or to drift?', ['Granule', 'Dust', 'Bait'], 1, ['Granules are heavy, so they reduce drift.', null, 'Bait is placed, not spread through the air.']]
  ],
  'moa-resistance': [
    ['What does a pesticide\'s "mode of action" mean?', ['How it kills the pest', 'How it gets into the pest', 'How long it lasts after you apply it'], 0, [null, 'That is the route of entry.', 'That is residual activity.']],
    ['What makes a product "non-repellent"?', ['Pests avoid treated areas', 'Pests cannot detect it, so they walk right through it', 'It only kills on contact'], 1, ['Avoiding treated areas is what a repellent causes.', null, 'Contact describes how it gets in, not whether pests can detect it.']],
    ['How does novaluron, the active ingredient in Trelona termite bait, work?', ['It stops termites from molting', 'It kills termites instantly', 'It drives termites away'], 0, [null, 'It works slowly on purpose, so the colony declines over time.', 'Bait has to be eaten and shared, so it cannot drive termites away.']],
    ['How does pesticide resistance build up?', ['One bug gets used to the product', 'Survivors breed, so the population changes over time', 'It only happens when rates are too high'], 1, ['A single bug does not "get used to it".', null, 'Low rates and using one product group over and over cause it too.']],
    ['To slow resistance when you switch products, what should change?', ['The brand name', 'The mode of action group number on the label', 'The sprayer you use'], 1, ['Two different brands can share the same group.', null, 'Your equipment does not change how the product kills.']]
  ],
  ipm: [
    ['In Integrated Pest Management (IPM), what is the first step?', ['Control the pest', 'Set an action threshold', 'Spray the perimeter'], 1, ['Control is the last step.', null, 'Treating comes after you know what you are dealing with.']],
    ['Sealing a gap under a door is which type of IPM tactic?', ['Cultural', 'Mechanical or physical', 'Chemical'], 1, ['Cultural tactics are sanitation and habitat changes.', null, 'No pesticide is involved.']],
    ['What should you do before you pick a product?', ['Identify the pest', 'Mix a full tank', 'Treat the most likely spots'], 0, [null, 'Mixing comes after you know the pest.', 'The wrong ID means the wrong plan.']],
    ['An action threshold is the pest level where you take action. In a hospital kitchen, what can the threshold be?', ['Zero. One pest is enough', 'Ten pests', 'Whatever the customer decides'], 0, [null, 'Food and healthcare sites can justify action at any sighting.', 'The threshold is set by the risk at the site.']],
    ['About how small a gap can a house mouse squeeze through?', ['1 inch', '1/4 inch', '1/2 inch'], 1, ['A mouse needs far less than that.', null, 'That is the size for a rat.']]
  ],
  toxicity: [
    ['Your risk of being harmed by a pesticide depends on which two things?', ['How poisonous it is, and how much of it gets on or in you', 'Its signal word, and the rate on the label', 'Its LD50, and how long it lasts on surfaces'], 0, [null, 'The signal word only shows how poisonous it is. It ignores how much you contact.', 'LD50 only measures how poisonous it is. How long it lasts is not your exposure.']],
    ['LD50 is the dose that kills half of test animals. Which LD50 means the most toxic product?', ['5,000 mg/kg', '50 mg/kg', '500 mg/kg'], 1, ['A higher LD50 means it takes more to kill, so it is less toxic.', null, 'Still ten times less toxic than 50.']],
    ['On the job, how does pesticide most often get into your body?', ['Through your skin', 'By swallowing it', 'Through your eyes'], 0, [null, 'Swallowing is rare at work.', 'Eye exposure happens, but skin contact is more common.']],
    ['You get concentrate on your skin. What do you do first?', ['Remove contaminated clothing and rinse for 15 to 20 minutes', 'Wipe it off and keep working', 'Make yourself vomit'], 0, [null, 'Wiping is not enough. Stop and rinse.', 'Vomiting has nothing to do with skin exposure, and is never the default.']],
    ['You need medical care after a pesticide exposure. What do you bring?', ['The product label', 'The invoice', 'The sprayer'], 0, [null, 'The doctor needs product details, not billing.', 'The label has the first aid steps and product facts.']],
    ['You feel dizzy with a headache while working in full PPE. What do you do?', ['Push through and finish', 'Stop, get out, and get medical care', 'Drink water and keep going'], 1, ['Heat stress and pesticide exposure look alike. Never push through.', null, 'Water alone does not rule out exposure.']]
  ],
  ppe: [
    ['How should you treat the PPE listed on a pesticide label?', ['As the minimum you must wear', 'As a suggestion', 'As only for mixing'], 0, [null, 'Label PPE is required.', 'It covers whatever tasks the label names, often application too.']],
    ['Working with Termidor HE in a crawl space, what does the label add to your PPE?', ['A particulate respirator and eye protection', 'A rubber apron only', 'Nothing extra'], 0, [null, 'The label adds breathing and eye protection in crawl spaces.', 'Crawl spaces add gear on that label.']],
    ['What do you do before taking off your gloves?', ['Wash the outside of them', 'Fold them in half', 'Put them in your pocket'], 0, [null, 'Folding spreads residue to your hands.', 'That carries pesticide around with you.']],
    ['How should you wash your PPE?', ['Separately, in hot water with detergent', 'With your family\'s laundry', 'A cold rinse only'], 0, [null, 'Keep it out of family laundry.', 'Hot water and detergent are the standard.']],
    ['When is the best time to schedule work in heavy PPE?', ['Midday', 'The coolest part of the day', 'Whenever is quickest'], 1, ['Midday heat adds to the heat stress from PPE.', null, 'Heat stress in PPE is a real risk.']]
  ],
  handling: [
    ['Which step of the job usually gives you the most pesticide exposure?', ['Mixing and loading', 'Driving to the job', 'Writing the service record'], 0, [null, 'Sealed product in transit is low exposure.', 'Paperwork has no product contact.']],
    ['When you fill a tank from a hose, what stops pesticide from siphoning back into the water supply?', ['Keeping the hose end under the water line', 'An air gap or an anti-backflow device', 'Turning the pump off'], 1, ['A hose end under the water is what causes backflow.', null, 'Backflow comes from the hose position, not the pump.']],
    ['The label does not give a mixing order. When do dry products like WP and WG go in the tank?', ['After the oily products (EC)', 'Early, right after water and agitation', 'Last'], 1, ['Oily products go in later.', null, 'Surfactants go in last.']],
    ['You put a dilution in a 3-gallon hand sprayer and apply straight from it. Does that sprayer need a service container label?', ['Yes', 'No'], 1, ['Dilutions of 3 gallons or less, used as the application device, are exempt.', null]],
    ['What is a good rule of thumb for storing pesticides?', ['Locked, dry, and between about 40 and 100°F', 'Anywhere in the truck cab', 'Next to food so it is easy to find'], 0, [null, 'Heat and freezing can both damage product.', 'Never store pesticides near food.']],
    ['Where should pesticides ride in your truck?', ['On the passenger seat', 'Secured, away from food, never in the cab', 'Wherever there is room'], 1, ['Never in the passenger compartment.', null, 'Loads must be secured.']]
  ],
  'spills-disposal': [
    ['The spill steps are Control, Contain, Clean up. What does "Control" mean, and when do you do it?', ['Clean up the spill. You do it first', 'Stop the source. You do it first', 'Dike it in. You do it first'], 1, ['Cleaning up comes last.', null, 'Diking it in is Contain, the second step.']],
    ['After a reportable spill, when is the written report due?', ['Within 48 hours', 'Within 10 working days', 'Within 30 days'], 1, ['48 hours is the deadline for the phone report.', null, 'That is too late.']],
    ['How many times do you rinse an empty pesticide container?', ['Once', 'Three times', 'Never'], 1, ['"Triple rinse" means three times.', null, 'Containers are always rinsed before disposal.']],
    ['Where does the rinse water from a container (rinsate) go?', ['Into the spray tank', 'Down a drain', 'On the driveway'], 0, [null, 'Never down a drain.', 'That creates runoff.']],
    ['What is the best way to get rid of extra mixed product?', ['Pour it out', 'Use it up on a site the label allows', 'Store it in a food jar'], 1, ['Never dump it.', null, 'Never use food containers.']]
  ],
  environment: [
    ['What is it called when pesticide moves down through the soil?', ['Runoff', 'Leaching', 'Drift'], 1, ['Runoff moves across the surface.', null, 'Drift moves through the air.']],
    ['If the label does not say, what wind speed is usually OK for spraying?', ['0 to 1 mph', '3 to 8 mph, blowing away from sensitive areas', '10 to 15 mph'], 1, ['Dead calm can mean an inversion.', null, 'Too windy. Drift goes up.']],
    ['You see fog in low spots and smoke drifting sideways. What could that mean?', ['A temperature inversion, so hold off spraying', 'Perfect spray weather', 'Rain is coming'], 0, [null, 'Fine droplets can hang in the air and travel.', 'These are signs of an inversion, not rain.']],
    ['How do you cut down spray drift?', ['Raise the pressure', 'Use bigger droplets and lower pressure', 'Use a finer nozzle'], 1, ['Higher pressure makes finer droplets.', null, 'Finer droplets drift more.']],
    ['Granules land on a sidewalk. What do you do?', ['Sweep them back onto the treatment area', 'Hose them into the street', 'Leave them'], 0, [null, 'That sends product into storm drains.', 'They can wash into drains.']],
    ['Bees are working blooming shrubs near your treatment area. What do you do?', ['Spray the shrubs quickly', 'Do not treat the blooming plants', 'Spray at noon'], 1, ['Protecting bees comes first.', null, 'Midday is when bees forage the most.']]
  ],
  equipment: [
    ['Under Virginia rules, what must your application equipment have?', ['Backflow prevention on fill hoses', 'A company logo', 'A 50-gallon tank'], 0, [null, 'Branding is not a legal requirement.', 'No tank size is required.']],
    ['What do you use to calibrate a sprayer?', ['Plain water, at your real job speed and pressure', 'Concentrate', 'Your best guess'], 0, [null, 'Calibrate without product.', 'Calibration is a measurement, not a guess.']],
    ['You time how long it takes to spray 1,000 sq ft. Spraying into a bucket for that same time, you catch 20 oz. What is your output?', ['20 oz per 1,000 sq ft', '2 oz per 1,000 sq ft', '200 oz per 1,000 sq ft'], 0, [null, 'The amount you catch is your output directly.', 'Off by a factor of ten.']],
    ['How does a worn nozzle change your output?', ['It puts out more', 'It puts out less', 'It does not change'], 0, [null, 'Wear opens the hole, so output goes up.', 'Wear always changes output.']],
    ['On soil surfaces, Termidor HE must be applied at or below what pressure?', ['25 PSI', '60 PSI', '100 PSI'], 0, [null, 'Too high for that label.', 'Far too high.']]
  ],
  math: [
    ['How many fluid ounces are in 1 gallon?', ['128', '64', '100'], 0, [null, 'That is half a gallon.', 'Close, but not the conversion.']],
    ['What is the area of a space 40 ft long and 25 ft wide?', ['65 sq ft', '1,000 sq ft', '130 sq ft'], 1, ['That adds the sides instead of multiplying.', null, 'That is the distance around it, the perimeter.']],
    ['The label rate is 2 fl oz per 1,000 sq ft. How much product do you need for 3,000 sq ft?', ['6 fl oz', '2 fl oz', '3 fl oz'], 0, [null, 'That only covers 1,000 sq ft.', 'That leaves out the rate.']],
    ['Your sprayer puts out 1 gallon per 1,000 sq ft. How much area does a 2-gallon tank cover?', ['2,000 sq ft', '1,000 sq ft', '500 sq ft'], 0, [null, 'That is one gallon\'s worth.', 'Coverage goes up with tank size, not down.']],
    ['The label says 0.5 fl oz per gallon. How much product goes in a 4-gallon tank?', ['2 fl oz', '0.5 fl oz', '4.5 fl oz'], 0, [null, 'That is enough for one gallon.', 'That adds instead of multiplying.']]
  ],
  'termite-biology': [
    ['Which termite caste does the damage to wood?', ['Workers', 'Soldiers', 'Swarmers'], 0, [null, 'Soldiers defend the colony.', 'Swarmers fly off to start new colonies.']],
    ['Why do termites build mud tubes?', ['To stay moist and sheltered as they travel', 'To store food', 'To signal a swarm'], 0, [null, 'Tubes are travel shelters, not storage.', 'Tubes are not a swarm signal.']],
    ['What is the main termite pest across Virginia?', ['Eastern subterranean termite', 'Drywood termite', 'Dampwood termite'], 0, [null, 'Drywood is not a routine Virginia pest.', 'Dampwood is not confirmed in Virginia.']],
    ['You find a termite soldier with a teardrop-shaped head. What could it be?', ['A Formosan termite', 'A native termite', 'A carpenter ant'], 0, [null, 'Native soldiers have rectangular heads.', 'Carpenter ants do not have termite soldiers.']],
    ['When will a soil treatment alone NOT control termites?', ['When the colony lives above ground on a moisture source', 'When the colony is in the soil', 'When swarmers show up outside'], 0, [null, 'Soil treatment is aimed at colonies in the soil.', 'Swarmers outside are not an infestation by themselves.']]
  ],
  'swarmers-id': [
    ['What kind of waist does a termite swarmer have?', ['Broad', 'Pinched', 'Hairy'], 0, [null, 'A pinched waist means an ant.', 'A hairy body is a bumble bee trait.']],
    ['How do an ant swarmer\'s wings compare?', ['The front wings are larger than the back wings', 'All four wings are the same length', 'It has no wings'], 0, [null, 'Equal-length wings point to a termite.', 'Swarmers have wings. That is how they fly.']],
    ['You find piles of wings on a windowsill. What do they suggest?', ['Termite swarmers', 'Spiders', 'Carpenter bees'], 0, [null, 'Spiders do not shed wings.', 'Carpenter bees do not leave wing piles.']],
    ['When do most termite swarm calls come in Virginia?', ['In spring', 'In winter', 'Termites do not swarm in Virginia'], 0, [null, 'Swarms in other months can happen, but spring is peak.', 'Swarms happen every year.']]
  ],
  conducive: [
    ['A conducive condition invites wood-destroying pests. Which one is a wood problem?', ['Firewood stacked against the foundation', 'A dry crawl space', 'A gravel walkway'], 0, [null, 'A dry crawl space is the goal.', 'Gravel is not a food source.']],
    ['Which one is a moisture problem that invites wood-destroying pests?', ['A leaking gutter', 'A sealed vent', 'Freshly painted trim'], 0, [null, 'A sealed vent is good.', 'Paint protects wood.']],
    ['Why is mulch piled against the siding a problem?', ['It gives termites a hidden way in', 'It keeps termites out', 'It counts as a treatment'], 0, [null, 'It does the opposite.', 'Mulch is not a treatment.']],
    ['You treat a house, but a conducive condition is still there. What happens to it?', ['It stays until someone fixes it', 'The treatment removes it', 'It is not your concern'], 0, [null, 'Treatment does not fix the condition.', 'Pointing it out is part of the job.']]
  ],
  'other-wdi': [
    ['What do carpenter ants do to wood?', ['Dig nests in it, but do not eat it', 'Eat it', 'Only live in dry wood'], 0, [null, 'Termites eat wood. Carpenter ants do not.', 'They favor moist wood, 15% moisture or more.']],
    ['How can you tell a carpenter bee from a bumble bee?', ['A carpenter bee has a shiny black abdomen', 'A carpenter bee has a hairy abdomen', 'A carpenter bee has a pinched waist'], 0, [null, 'A fully hairy abdomen is a bumble bee.', 'A pinched waist is an ant.']],
    ['Which wood do Lyctid powderpost beetles attack?', ['Hardwoods only', 'Softwoods only', 'Any dry wood'], 0, [null, 'Softwood only is the old house borer.', 'Lyctids need hardwood.']],
    ['You find gritty powder (frass) in crawl space joists. Which beetle is likely?', ['Anobiid', 'Lyctid', 'Carpenter bee'], 0, [null, 'Lyctid frass feels like talc.', 'Carpenter bees leave sawdust under round holes.']],
    ['Which wood do Bostrichid beetles prefer?', ['Fresh, high-moisture wood', 'Old, dry trim', 'Painted wood'], 0, [null, 'They prefer newly cut wood.', 'Paint does not attract them.']],
    ['Despite its name, which homes does the old house borer mostly attack?', ['Newer homes', 'Only old homes', 'Homes with hardwood floors'], 0, [null, 'The name is the trap.', 'It attacks softwood, not hardwood.']]
  ],
  'decay-moisture': [
    ['Above about what wood moisture can decay fungi grow?', ['25 to 30%', '10%', '5%'], 0, [null, '10% is dry wood.', 'Far too dry for decay.']],
    ['What wood moisture level is the design safety margin?', ['20%', '50%', '0%'], 0, [null, 'Far above where decay starts.', 'Wood always holds some moisture.']],
    ['Ninefold\'s moisture service aims to keep crawl space humidity under what level?', ['60%', '90%', '30%'], 0, [null, 'Far too damp.', 'That is not the stated target.']],
    ['Which of these is a real type of wood rot?', ['Brown rot', 'Red rot', 'Gray rot'], 0, [null, 'Not one of the main types: brown, white and soft rot.', 'Not one of the main types: brown, white and soft rot.']],
    ['Does mold go on the NPMA-33 wood-destroying insect report?', ['Yes', 'No'], 1, ['Mold and fungi are not on the NPMA-33.', null]]
  ],
  construction: [
    ['Which part of a house sits right on top of the foundation wall?', ['The sill plate', 'The subfloor', 'The floor joists'], 0, [null, 'The subfloor sits on the joists.', 'The joists sit on the sill plate.']],
    ['What do you call a slab and footing poured together as one piece?', ['Monolithic slab', 'Floating slab', 'Supported slab'], 0, [null, 'A floating slab is poured separately inside the walls.', 'A supported slab rests on the foundation wall.']],
    ['Which of these is a common way for termites to get into a slab home?', ['Expansion joints', 'Painted siding', 'Sealed windows'], 0, [null, 'Paint is not an opening.', 'Sealed windows are closed.']],
    ['How does the Termidor HE label sort crawl spaces?', ['Accessible or inaccessible', 'It treats them all the same', 'It does not cover crawl spaces'], 0, [null, 'The label gives each type its own directions.', 'The label does cover crawl spaces.']]
  ],
  treatment: [
    ['What is the goal of a liquid termite treatment?', ['A continuous treated zone around the structure', 'Spot spraying where termites were seen', 'A fence that termites cannot cross'], 0, [null, 'Gaps let termites through.', 'The label calls it a treated zone, not a barrier.']],
    ['Fipronil, the active ingredient in Termidor HE, is what kind of product?', ['Non-repellent', 'Repellent', 'Fumigant'], 0, [null, 'Termites cannot detect it, so it is not a repellent.', 'Fumigants are a different category.']],
    ['What do you do before drilling through a slab?', ['Locate ducts, pipes and wiring', 'Start drilling at a corner', 'Wet the slab'], 0, [null, 'Locate utilities first.', 'Wetting the slab is not a step.']],
    ['What does the Termidor HE label say about wells and cisterns?', ['No treatment within 10 ft, and only the backfill method from 10 to 15 ft', 'Treat right up to them', 'There is no limit'], 0, [null, 'The label sets a distance.', 'There is a limit.']],
    ['How does Trelona termite bait work?', ['Slowly, as workers feed on it and share it', 'Overnight', 'By driving termites away'], 0, [null, 'It is not a quick fix.', 'Bait has to be eaten to work.']],
    ['Fumigation falls under which Virginia certification category?', ['7C', '7B', '7A'], 0, [null, '7B does not include fumigation.', '7A is general pest control.']]
  ],
  'termite-math': [
    ['The termiticide formula is gallons = (linear feet ÷ 10) x rate x what?', ['Depth in feet', 'Width in feet', 'Number of drill holes'], 0, [null, 'Width is not in the formula.', 'Holes are counted after you know the gallons.']],
    ['What is Termidor HE\'s label rate?', ['2 gallons per 10 linear feet per foot of depth', '4 gallons per 10 linear feet per foot of depth', '1 gallon per 10 linear feet'], 0, [null, 'That is the classic textbook rate, not Termidor HE.', 'That is not the label rate.']],
    ['Using Termidor HE on 200 linear feet with a footing 3 feet deep, what is the minimum number of gallons?', ['80', '120', '40'], 0, [null, 'Termidor HE treats to a 2-foot minimum: 20 x 2 x 2 = 80.', 'That only covers 1 foot of depth.']],
    ['How many gallons does a 1,000 sq ft area take at 1 gallon per 10 sq ft?', ['100', '10', '1,000'], 0, [null, 'Off by a factor of ten.', 'Off by a factor of ten the other way.']],
    ['How many drill holes do you need along 30 ft of wall at one hole every 18 inches?', ['20', '30', '10'], 0, [null, 'That is one hole per foot.', 'Too few for 18-inch spacing.']]
  ],
  inspection: [
    ['Which tool belongs in a termite inspection kit?', ['A moisture meter', 'A fogger', 'A lawn spreader'], 0, [null, 'Foggers are for treatment.', 'Spreaders are for lawns.']],
    ['You break open a mud tube and it is empty. What does that tell you?', ['Termites may still be active', 'The termites are definitely gone', 'Termites were never there'], 0, [null, 'An empty tube does not mean they are gone.', 'Termites built the tube.']],
    ['What does the NPMA-33 inspection report cover?', ['Visible evidence on the inspection date', 'A warranty', 'Structural damage'], 0, [null, 'There is no warranty unless one is attached.', 'It is not a structural damage report.']],
    ['On the NPMA-33, can you check more than one evidence box?', ['Yes', 'No'], 0, [null, 'You can check more than one box.']],
    ['Is an attached deck part of the structure on an inspection?', ['Yes', 'No, ignore it', 'It needs its own separate report'], 0, [null, 'It is part of the structure.', 'It goes on the same form.']]
  ]
};
