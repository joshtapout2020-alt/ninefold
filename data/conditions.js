/* Conducive conditions. Real Ninefold job photos in img/conditions/.
   Each photo: tap everything conducive you can see, then the reveal explains each pick.
   `yes: true` = a conducive condition that is visible in the photo. `yes: false` = not in this photo,
   or present but not a conducive condition. The "say" lines are suggestions, not company scripts. */
window.NF = window.NF || {};

/* The categories a WDO inspection report uses, plus the general-pest ones techs see every day. */
NF.conditionTypes = [
  { t: 'Excessive moisture', b: 'Wet soil, wet wood, damp crawlspace air, leaks, condensation. Subterranean termites, decay fungi, carpenter ants, powderpost beetles, roaches, millipedes and springtails all follow water.' },
  { t: 'Wood-to-soil contact', b: 'Any wood touching the ground: siding, trim, posts, steps, form boards. Termites walk straight in without building a tube anyone can see.' },
  { t: 'Faulty grade', b: 'Soil sloping toward the house, or soil and mulch built up above the foundation line. Water runs to the wall, and termites get hidden entry above the slab or sill.' },
  { t: 'Insufficient ventilation', b: 'Blocked, buried or too few crawlspace vents. Moist air stays put, wood stays damp and fungi grow.' },
  { t: 'Cellulose debris', b: 'Scrap wood, cardboard, paper, form boards and leaves left in a crawlspace or against the house. Food for termites and harborage for everything else.' },
  { t: 'Mulch and vegetation against the house', b: 'Deep mulch holds moisture against the foundation and hides termite tubes. Plants touching the siding give ants and spiders a bridge.' },
  { t: 'Standing water', b: 'Anything that holds water for a week can breed mosquitoes: buckets, tarps, clogged gutters, plant saucers.' },
  { t: 'Gaps and openings', b: 'Torn vent screens, gaps around pipes, missing door sweeps, eave gaps, stuck-open dryer vents. A mouse needs about a quarter inch, a rat about half an inch.' },
  { t: 'Rodent signs', b: 'Droppings, dark rub marks along walls and joists, gnaw holes, chewed carpet at doors, burrows at the foundation, torn insulation. These are activity, not just conditions: note them and trap.' },
  { t: 'Evidence vs conditions', b: 'Conditions invite pests. Evidence shows they are there: mud tubes, soil packed around outlets, exit holes, frass, damaged wood, droppings. On a WDO report the two are written up separately.' }
];

NF.conditions = [
  { id: 'mulch-bed', img: 'img/conditions/mulch-bed.jpg', t: 'Front entry bed', where: 'Exterior, beside a commercial entry door',
    ask: 'Tap everything conducive you can see.',
    spots: [
      { t: 'Mulch piled against the foundation', yes: true, why: 'The mulch runs right up the brick with no gap. It holds moisture against the wall and hides termite tubes from your inspection.' },
      { t: 'Bucket holding water', yes: true, why: 'Any container that holds water for about a week can breed mosquitoes. This one sits right next to the door.' },
      { t: 'Irrigation line running through the bed', yes: true, why: 'Drip or soaker line inside the bed keeps the mulch wet against the foundation, which is exactly what termites and ants want.' },
      { t: 'Mulch built up to the door threshold', yes: true, why: 'The bed reaches the door frame. Moist mulch against the threshold invites termites and ants into the frame and the gap under it.' },
      { t: 'Firewood stacked against the wall', yes: false, why: 'Not in this photo. It would be conducive if it were there: firewood is cellulose and harborage.' },
      { t: 'Tree limbs touching the roof', yes: false, why: 'Not in this photo. There are no limbs near the roof in this shot.' }
    ],
    invites: 'Subterranean termites, ants, mosquitoes, millipedes and roaches.',
    fix: ['Pull mulch back several inches from the foundation, and keep it shallow, about 2 to 3 inches deep.', 'Dump the bucket, or drill drain holes in it.', 'Move irrigation so it waters plants, not the foundation.'],
    say: '"Mulch right against the brick keeps that wall damp, and termites love that. If you pull it back a few inches, we can see the foundation and it dries out."',
    record: 'Note: mulch against foundation, irrigation in bed, standing water container. Add a photo.' },

  { id: 'downspout', img: 'img/conditions/downspout.jpg', t: 'Downspout at the crawl vent', where: 'Exterior, side of a block-foundation house',
    ask: 'Tap everything conducive you can see.',
    spots: [
      { t: 'Downspout dumping at the foundation', yes: true, why: 'The downspout ends right at the wall with no extension. Every rain soaks the soil along the foundation.' },
      { t: 'Wet foundation wall', yes: true, why: 'The dark band on the block is water wicking up the wall. That moisture moves into the crawlspace.' },
      { t: 'Leaves and debris against the foundation', yes: true, why: 'Leaf litter piles against the block and under the vent. It holds moisture and gives pests cover.' },
      { t: 'Moss and soggy soil along the wall', yes: true, why: 'Moss means the soil stays damp and shaded. The low strip along the wall holds water after rain.' },
      { t: 'Crawlspace vent close to the ground', yes: true, why: 'The vent sits low, with debris below it. Splash and debris can block it, and it is an easy entry for pests if the screen fails.' },
      { t: 'Mulch piled on the siding', yes: false, why: 'Not here. There is no mulch bed on this side, only grass, moss and leaves.' }
    ],
    invites: 'Subterranean termites, wood decay fungi, camel crickets, millipedes and springtails.',
    fix: ['Add a downspout extension or splash block that carries water at least a few feet from the house.', 'Clear leaves away from the foundation and the vent.', 'Fill the low strip so water runs away from the wall.'],
    say: '"All the water off this side of the roof lands right here at your foundation. An extension on that downspout is cheap, and it keeps your crawlspace much drier."',
    record: 'Note: downspout discharging at foundation, wet block, debris at vent, poor drainage. Add a photo.' },

  { id: 'crawl-wall', img: 'img/conditions/crawl-wall.jpg', t: 'Crawlspace block wall', where: 'Inside a crawlspace, along the foundation',
    ask: 'Tap everything conducive you can see. Careful: one item is not a conducive condition.',
    spots: [
      { t: 'White crusty deposits on the block', yes: true, why: 'That is efflorescence: minerals left behind when water moves through the block and dries. It proves water is coming through the wall.' },
      { t: 'Dark moisture staining', yes: true, why: 'The dark patches on the block and the rust stains near the bottom show the wall stays damp.' },
      { t: 'Vapor barrier pulled away from the wall', yes: true, why: 'The plastic is not sealed to the wall. Soil moisture comes up at the edge, and termites can travel the gap unseen.' },
      { t: 'Dirt and debris on the vapor barrier', yes: true, why: 'Soil and debris on the plastic along the wall hold moisture and can hide termite activity at the foundation.' },
      { t: 'Small drilled holes in the block', yes: false, why: 'Not a conducive condition. Those holes are usually from an earlier termite treatment, drilled to treat the block voids. Note them on your inspection, since they tell you the house has treatment history.' }
    ],
    invites: 'Subterranean termites, wood decay fungi, camel crickets and spiders.',
    fix: ['Fix the outside drainage first: gutters, downspouts, grade.', 'Seal the vapor barrier to the wall and overlap the seams.', 'Recommend a moisture or crawlspace contractor if the wall stays wet.'],
    say: '"This white crust is from water coming through the block. Before we talk about treatment, let\'s get that water handled, or anything we do is fighting the moisture."',
    record: 'Note: efflorescence and moisture staining on foundation, vapor barrier not sealed to wall. Note the old drill holes as treatment history. Add photos.' },

  { id: 'crawl-barrier', img: 'img/conditions/crawl-barrier.jpg', t: 'Crawlspace overview', where: 'Inside a crawlspace, looking along two walls',
    ask: 'Tap everything conducive you can see.',
    spots: [
      { t: 'Vapor barrier loose, with soil showing at the wall', yes: true, why: 'Along the right wall the plastic stops short and bare soil shows. Moisture comes straight up into the crawlspace there.' },
      { t: 'Moisture staining on the block walls', yes: true, why: 'The dark streaks and blotches across the block mean the walls stay damp.' },
      { t: 'Debris and soil on the barrier', yes: true, why: 'Dirt and debris spread over the plastic hold moisture and hide what is underneath.' },
      { t: 'Sagging insulation and loose duct wrap', yes: true, why: 'Insulation that sags or falls is often wet or heavy with moisture, and it gives pests and rodents harborage overhead.' },
      { t: 'Firewood stored in the crawlspace', yes: false, why: 'Not in this photo. It would be conducive cellulose debris if it were.' }
    ],
    invites: 'Subterranean termites, wood decay fungi, rodents, camel crickets and spiders.',
    fix: ['Cover all exposed soil and seal the barrier to the walls.', 'Clear debris off the barrier.', 'Have damaged insulation and duct wrap repaired or replaced.'],
    say: '"Where the plastic stops, the ground breathes moisture right into this space. Covering and sealing it is one of the best things you can do for this crawlspace."',
    record: 'Note: exposed soil, vapor barrier incomplete, moisture staining, damaged insulation. Add photos.' },

  { id: 'joists', img: 'img/conditions/joists-marked.jpg', more: ['img/conditions/joist-close-1.jpg', 'img/conditions/joist-close-2.jpg', 'img/conditions/joist-close-3.jpg'], t: 'Floor joists with white growth', where: 'Inside a crawlspace, looking up at the floor framing',
    ask: 'The circles mark what you are looking at. Tap everything conducive you can see.',
    spots: [
      { t: 'White fuzzy growth on the joists', yes: true, why: 'That fuzzy growth is fungal. It only grows when the wood and the air stay damp. Do not call it a specific mold; just report the growth and the moisture.' },
      { t: 'Dark staining on the joists and rim', yes: true, why: 'The dark streaks along the wood show it has been wet over time. Long-term wet wood can lead to decay.' },
      { t: 'High humidity under the house', yes: true, why: 'Growth on the framing means the crawlspace air is too humid. Wood decay fungi generally need wood moisture around 20 percent or more.' },
      { t: 'Termite mud tubes on the joists', yes: false, why: 'Not in this photo. The white strands are fungal growth and insulation fibers, not mud tubes. Mud tubes are brown, made of soil.' },
      { t: 'Clean vapor barrier on the floor', yes: false, why: 'Not a conducive condition. The white barrier on the ground looks good in this shot. The moisture problem is in the air and the framing.' }
    ],
    invites: 'Wood decay fungi, powderpost beetles, termites, and moisture pests like springtails and camel crickets.',
    fix: ['Take a moisture meter reading on the joists and write it down.', 'Recommend a crawlspace or moisture contractor to dry the space: drainage, sealing, dehumidifier.', 'Do not clean or treat the growth yourself unless it is a Ninefold service.'],
    say: '"This white growth tells us it\'s too humid under the house. It isn\'t termites, but this kind of moisture is what leads to wood damage, so it\'s worth getting looked at."',
    record: 'Note: fungal growth on floor joists, moisture staining, high crawlspace humidity. Record the moisture meter reading. Add photos.' },

  { id: 'rodent-exterior', img: 'img/conditions/roofline-gap.jpg', more: ['img/conditions/chewed-corner.jpg', 'img/conditions/dryer-vent.jpg'], t: 'Rodent entry: roofline, trim and vents', where: 'Exterior. Three photos: use the thumbnails',
    ask: 'Look at all three photos. Tap every rodent entry point you can see.',
    spots: [
      { t: 'Gap where the roofline meets the brick', yes: true, why: 'Photo 1: the opening at the eave corner is a classic roof rat and squirrel entry. Rats only need about half an inch; mice a quarter inch.' },
      { t: 'Chewed hole in the corner trim', yes: true, why: 'Photo 2: the ragged hole in the corner post was chewed open. Chewing means a rodent was working its way in.' },
      { t: 'Dryer vent flap stuck open, packed with lint', yes: true, why: 'Photo 3: the flap no longer closes, and the lint and webbing are soft nesting material right at the opening.' },
      { t: 'Gutter overflowing onto the roof', yes: false, why: 'Not in these photos. A clogged gutter is conducive to moisture pests, but none is shown here.' },
      { t: 'Bait station tipped over', yes: false, why: 'Not in these photos. No bait stations are shown.' }
    ],
    invites: 'Roof rats, Norway rats, mice and squirrels. Also wasps and birds at the eave gap.',
    fix: ['Seal the eave gap and the chewed trim with metal: hardware cloth, flashing, or a ridge guard.', 'Replace the dryer vent cover with a rodent-proof one, and clean out the lint.', 'Trim branches 6 to 8 feet back from the roofline.'],
    say: '"Rodents are getting in up high. This gap at the roof corner and this chewed trim are their doors. We can seal these with metal so they can\'t chew back through."',
    record: 'Note each entry point with its location and size: eave gap, chewed corner trim, dryer vent. Photograph each one. Per the exclusion SOP, list the material each repair needs.' },

  { id: 'rodent-inside', img: 'img/conditions/gnaw-baseboard.jpg', more: ['img/conditions/chewed-carpet.jpg'], t: 'Rodent signs indoors', where: 'Inside. Two photos: use the thumbnails',
    ask: 'Tap every sign of rodent activity you can see in the two photos.',
    spots: [
      { t: 'Gnawed hole at the bottom of the wall', yes: true, why: 'Photo 1: a chewed opening at the baseboard, with dark edges. That is an active path in and out of the wall.' },
      { t: 'Dark rub marks around the hole', yes: true, why: 'Photo 1: the grease marks around the opening come from rodent fur rubbing the same spot again and again. It means the hole is used often.' },
      { t: 'Chewed carpet at the door corner', yes: true, why: 'Photo 2: rodents chew carpet at the bottom of doors to squeeze under them. The torn edge at the jamb is the giveaway.' },
      { t: 'Termite mud tubes on the wall', yes: false, why: 'Not here. Mud tubes are pencil-width tunnels of soil. These photos show chewing and rub marks: rodents.' },
      { t: 'Cockroach egg cases in the corner', yes: false, why: 'Not visible in these photos.' }
    ],
    invites: 'Mice and rats, and the fleas and mites they carry.',
    fix: ['Set snap traps in pairs along the wall near the hole and the door.', 'Find and seal the outside entry. Inside holes are only the exit.', 'No bait indoors unless a manager approves it, in tamper-resistant stations only.'],
    say: '"These dark marks are from rodents rubbing the same path every night. We\'ll trap here inside and, just as important, find where they\'re getting in from outside."',
    record: 'Note: gnaw hole at baseboard with rub marks, chewed carpet at door. Record trap count and locations. Add photos.' },

  { id: 'rodent-crawl', img: 'img/conditions/crawl-droppings.jpg', more: ['img/conditions/crawl-rubmarks.jpg', 'img/conditions/crawl-insulation.jpg'], t: 'Rodents in the crawlspace', where: 'Crawlspace framing. Three photos: use the thumbnails',
    ask: 'Tap every sign of rodent activity you can see.',
    spots: [
      { t: 'Droppings along the sill and joists', yes: true, why: 'Photo 1: the dark pellets lined up on the wood are droppings. Rodents travel the sill plate like a highway.' },
      { t: 'Dark rub marks on the joists', yes: true, why: 'Photo 2: the dark staining along the joist edge is grease from fur, left by repeated travel.' },
      { t: 'Insulation pulled down and tunneled', yes: true, why: 'Photos 1 and 3: torn, hanging insulation is where rodents nest and tunnel. Wet or soiled insulation has to be replaced.' },
      { t: 'Wiring rodents can reach', yes: true, why: 'Wires run right along the rodent path. Rats and mice chew wiring, which is a fire risk. Point it out.' },
      { t: 'Termite mud tubes on the block', yes: false, why: 'Not in these photos. The signs here are droppings, rub marks and torn insulation: rodents.' }
    ],
    invites: 'Mice and rats. Their droppings and urine also carry disease.',
    fix: ['Wear gloves and a respirator in heavy activity. Never sweep or vacuum dry droppings.', 'Trap along the sill and joists, then seal the entry points outside.', 'Recommend removing and replacing soiled insulation.'],
    say: '"There\'s a lot of rodent activity under here. The droppings and torn insulation tell us they\'re living here, not just passing through. We\'ll trap, seal, and recommend replacing the dirty insulation."',
    record: 'Note: droppings on sill and joists, rub marks, damaged insulation, exposed wiring. Record trap placements. Add photos.' },

  { id: 'trim-grade', img: 'img/conditions/trim-rot.jpg', more: ['img/conditions/trim-burrow.jpg'], t: 'Rodent entry at the trim', where: 'Exterior, wood trim beside a block foundation. Two photos',
    ask: 'This is a rodent entry point. Tap the entry signs, and the conditions that helped rodents get in.',
    spots: [
      { t: 'Gap between the trim and the block wall', yes: true, why: 'Photo 1: this is the doorway. The dark opening between the wood and the block leads straight inside. A rat needs only about half an inch; a mouse about a quarter inch.' },
      { t: 'Rotted, chewed wood at the bottom of the trim', yes: true, why: 'Photo 1: rodents chew through soft, rotted wood easily, and widen the gap as they use it. Rot is what made this spot easy.' },
      { t: 'Burrow at the base of the wall', yes: true, why: 'Photo 2: the round hole at the foot of the trim is a rodent burrow running under the structure. Rats often dig in right where they then enter.' },
      { t: 'Wood touching the soil', yes: true, why: 'The trim runs into the dirt, so it stays wet and rots. That rot is what rodents chewed through. It is also a termite risk.' },
      { t: 'Weeds and ground cover against the wall', yes: true, why: 'Plants at the base hide the burrow and the gap, and give rodents cover as they come and go.' },
      { t: 'Downspout dumping on the trim', yes: false, why: 'Not in these photos. There is no downspout here.' }
    ],
    invites: 'Rats and mice first. The wet, rotted wood is also a risk for termites, carpenter ants and wood decay.',
    fix: ['Trap first, along the wall near the gap and burrow, so you do not seal rodents inside.', 'Once activity stops, seal the gap with hardware cloth or sheet metal, packed with copper mesh. Not foam.', 'Collapse and fill the burrow, and watch for it to reopen.', 'Replace the rotted trim and cut it back so it sits above the soil.'],
    say: '"Rodents are getting in right here. They chewed through this rotted trim and dug in at the base. We\'ll trap first, then seal it with metal so they can\'t chew back through."',
    record: 'Rodent entry: gap at trim and block, chewed rotted wood, active burrow. Note size and location, traps set, and materials needed to seal. Photos. See the rodent exclusion SOP.' },

  { id: 'leaves', img: 'img/conditions/leaves-crawldoor.jpg', more: ['img/conditions/leaves-side.jpg', 'img/conditions/leaves-shrubs.jpg'], t: 'Leaves and shrubs against the house', where: 'Exterior. Three photos: use the thumbnails',
    ask: 'Tap everything conducive you can see.',
    spots: [
      { t: 'Leaves piled against the crawlspace door', yes: true, why: 'Photo 1: the leaf pile hides the door and holds moisture against it. Rodents and insects shelter in it, right at an entry.' },
      { t: 'Leaf litter along the foundation', yes: true, why: 'Photo 2: a deep layer of leaves runs along the whole wall. It stays damp and gives cover to pests and termites.' },
      { t: 'Shrubs touching the house', yes: true, why: 'Photo 3: branches against the siding are a bridge for ants, spiders and rodents, and they keep the wall shaded and damp.' },
      { t: 'Standing water in a bucket', yes: false, why: 'Not in these photos.' },
      { t: 'Firewood stacked at the door', yes: false, why: 'Not in these photos. There are leaves, not firewood.' }
    ],
    invites: 'Termites, ants, spiders, millipedes, camel crickets, ticks and rodents.',
    fix: ['Rake leaves at least a couple of feet back from the foundation, and keep the crawl door clear.', 'Trim shrubs so there is space between them and the house.'],
    say: '"These leaves are a cozy, damp home right against your house for everything we\'re trying to keep out. Clearing a strip along the wall makes our treatment work much better."',
    record: 'Note: cellulose debris and leaf litter at foundation and crawl access, vegetation touching structure. Add photos.' },

  { id: 'foam-seal', img: 'img/conditions/foam-pipe.jpg', t: 'Sealing a pipe penetration', where: 'Exterior block wall where a line comes through',
    ask: 'This is someone sealing a pipe gap with spray foam. Tap what is wrong with this repair.',
    spots: [
      { t: 'Foam alone, with no copper mesh behind it', yes: true, why: 'Rodents chew right through foam. Ninefold\'s exclusion SOP says pack coarse copper mesh into the gap first, then seal over it.' },
      { t: 'The gap around the line was an entry point', yes: true, why: 'Any gap where a pipe or wire comes through the wall is a rodent and insect doorway. Finding it was right; the material is the problem.' },
      { t: 'Foam is the wrong color', yes: false, why: 'Color does not matter. What matters is what is behind the foam.' },
      { t: 'The block should never be sealed', yes: false, why: 'Sealing penetrations is good practice. Only weep holes in brick stay open, with copper mesh only.' }
    ],
    invites: 'Mice and rats chew through foam-only repairs, often within days.',
    fix: ['Pull the foam, pack coarse copper mesh into the gap, then seal over it.', 'Re-inspect the repair on the next visit.'],
    say: '"Foam by itself won\'t stop a mouse. They chew right through it. We pack copper mesh in first, then seal over it, so it lasts."',
    record: 'Note: pipe penetration, sealed with copper mesh and sealant. Add before and after photos.' },

  { id: 'wdo-evidence', img: 'img/conditions/outlet-mud.jpg', more: ['img/conditions/powderpost.jpg'], t: 'Evidence, not just conditions', where: 'Two photos: a kitchen outlet, and a beam. Use the thumbnails',
    ask: 'These show evidence of wood-destroying insects, not just conditions. Tap what you would report as evidence.',
    spots: [
      { t: 'Dirt packed around the outlet cover', yes: true, why: 'Photo 1: subterranean termites pack soil into gaps and can come out through outlets and switch plates. Report it as visible evidence, then inspect the wall for tubes and damage.' },
      { t: 'Small round exit holes in the wood', yes: true, why: 'Photo 2: tiny round holes are where adult powderpost beetles chewed out of the wood.' },
      { t: 'Fine powdery frass below the holes', yes: true, why: 'Photo 2: flour-like frass piled under the holes. Fresh, light-colored frass suggests the beetles are active.' },
      { t: 'Mouse droppings by the outlet', yes: false, why: 'Not in these photos. The material around the outlet is soil, not droppings.' },
      { t: 'Carpenter ant sawdust with insect parts', yes: false, why: 'Not shown. Carpenter ant frass is coarse and shredded, often with insect parts. Powderpost frass is fine as flour.' }
    ],
    invites: 'This is evidence of subterranean termites and powderpost beetles.',
    fix: ['Do a full inspection: tubes, damage, moisture, and the extent of activity.', 'Refer to the termite or WDO process with your manager.'],
    say: '"This dirt around your outlet is something termites do. I want to take a closer look and have our termite team check it out."',
    record: 'On a WDO report, visible evidence is reported separately from conducive conditions. Note location, type of evidence and photos.' },

  { id: 'standing-water', img: 'img/conditions/standing-water.jpg', t: 'Standing water', where: 'A drainage ditch at the edge of a property',
    ask: 'Tap everything that makes this a mosquito problem.',
    spots: [
      { t: 'Still water that is not flowing', yes: true, why: 'Mosquitoes lay eggs on still water. Moving water is much less of a problem.' },
      { t: 'Algae and scum on the surface', yes: true, why: 'Algae and floating debris mean the water has sat for a long time and is rich in food for larvae.' },
      { t: 'Tall, dense vegetation along the edges', yes: true, why: 'Adult mosquitoes rest in tall, shaded vegetation during the day, right beside the water.' },
      { t: 'Mulch against the foundation', yes: false, why: 'Not in this photo. There is no house in this shot.' }
    ],
    invites: 'Mosquitoes, plus midges and other aquatic insects.',
    fix: ['Drain or fill small water holders on the property.', 'For ditches and ponds, the customer may need the property owner or county.', 'Mosquito SOP: no direct application into ponds; keep fogging 20 to 30 feet from water; In2Care traps go in shade.'],
    say: '"Still water like this is a mosquito nursery. We\'ll treat the resting areas around your yard, but we can\'t spray into the water itself."',
    record: 'Note: standing water source and distance from the home. Add a photo.' }
];

/* One question per photo. Missing spots on a photo sends its question to Callbacks. */
NF.conditionQs = [
  { id: 'cc-mulch-bed', module: null, question: 'Mulch is piled right up against the brick foundation. Why is that a problem?', choices: ['It holds moisture against the wall and hides termite tubes', 'It makes the bed look messy to the customer', 'It attracts birds that peck at the brick', 'It blocks the sun from the lawn'], answer: 0, explanation: 'Deep mulch against the foundation stays damp and covers the spot where termites would build tubes, so you cannot inspect it.', whyNot: [null, 'Looks are not the issue. Moisture and hidden termite entry are.', 'Birds are not the concern with mulch.', 'Mulch in a bed does not shade the lawn.'] },
  { id: 'cc-downspout', module: null, question: 'A downspout empties right at the foundation next to a crawl vent. What is the best recommendation?', choices: ['Add an extension so water lands a few feet from the house', 'Spray the downspout with a residual', 'Close the crawl vent for good', 'Put mulch around the downspout'], answer: 0, explanation: 'Moving the water away from the foundation is the fix. Less water at the wall means a drier crawlspace and fewer termites and moisture pests.', whyNot: [null, 'Product does not fix water. The water source is the problem.', 'Sealing vents without a full moisture plan can trap humid air.', 'Mulch would hold even more moisture at the foundation.'] },
  { id: 'cc-crawl-wall', module: null, question: 'White, crusty deposits on crawlspace block walls usually mean what?', choices: ['Water is moving through the block', 'Termites are active in the wall', 'The block was painted', 'Mold is eating the concrete'], answer: 0, explanation: 'That crust is efflorescence: minerals left as water passes through masonry and evaporates. It is proof of moisture.', whyNot: [null, 'Termites leave mud tubes, not white mineral crust.', 'Paint does not form crusty white deposits.', 'Mold does not eat concrete. The crust is minerals.'] },
  { id: 'cc-crawl-barrier', module: null, question: 'In a crawlspace, the vapor barrier stops short of the wall and bare soil shows. Why does that matter?', choices: ['Soil moisture comes straight up into the crawlspace', 'The barrier will blow away', 'It lowers the house\'s heating bill', 'Rodents cannot get in'], answer: 0, explanation: 'Exposed soil releases moisture into the crawlspace air. Covering and sealing it is a key moisture fix.', whyNot: [null, 'Crawlspaces are not windy. Moisture is the issue.', 'Exposed soil does not lower heating bills. Damp air usually makes things worse.', 'A gap in the barrier has nothing to do with keeping rodents out.'] },
  { id: 'cc-rodent-exterior', module: null, question: 'About how small a gap can a mouse get through?', choices: ['About a quarter inch', 'About 2 inches', 'About 4 inches', 'Only an open door'], answer: 0, explanation: 'Mice fit through about a quarter inch; rats about half an inch. Seal every gap that size.', whyNot: [null, 'That is far bigger than a mouse needs.', 'Even a rat needs only about half an inch.', 'Mice fit through tiny gaps, not just doors.'] },
  { id: 'cc-rodent-inside', module: null, question: 'Dark, greasy marks around a hole at the baseboard mean what?', choices: ['Rodents use that path often', 'A water leak', 'Termite activity', 'Old paint'], answer: 0, explanation: 'Rub marks are grease from rodent fur on a path they travel again and again.', whyNot: [null, 'Water leaves stains and swelling, not greasy rub marks.', 'Termites leave mud, not grease.', 'Paint does not build up as greasy marks at a hole.'] },
  { id: 'cc-rodent-crawl', module: null, question: 'Heavy rodent droppings in a crawlspace. How do you handle them?', choices: ['Gloves and a respirator; never sweep or vacuum them dry', 'Sweep them into a pile', 'Vacuum them up', 'Leave them and do not mention it'], answer: 0, explanation: 'Dry droppings can release disease particles when disturbed. Protect yourself and do not stir them up.', whyNot: [null, 'Sweeping stirs up particles.', 'Vacuuming stirs up particles too.', 'Report what you find. It shows activity.'] },
  { id: 'cc-trim-grade', module: null, question: 'You find a rodent gap and fresh burrow at a rotted trim board. What comes first?', choices: ['Trap until activity stops, then seal with metal and copper mesh', 'Seal it with foam right away', 'Seal it first, then set traps inside', 'Spray the burrow and leave'], answer: 0, explanation: 'Trap first so you do not seal rodents inside. Then close the gap with material they cannot chew.', whyNot: [null, 'Rodents chew through foam, and sealing first can trap them inside.', 'Sealing first can trap rodents in the wall, where they die or chew a new way out.', 'Spraying does not remove rodents or close the entry.'] },
  { id: 'cc-leaves', module: null, question: 'Why point out leaves piled against the foundation?', choices: ['They hold moisture and shelter pests right at the wall', 'They look untidy', 'They block sunlight from the lawn', 'They are a fire code violation'], answer: 0, explanation: 'Leaf litter is cellulose debris that stays damp and gives pests and termites cover.', whyNot: [null, 'Looks are not why it matters.', 'The issue is at the foundation, not the lawn.', 'This is about pests, not fire code.'] },
  { id: 'cc-foam-seal', module: null, question: 'What is the right way to seal a pipe gap against rodents?', choices: ['Pack copper mesh first, then seal over it', 'Spray foam only', 'Caulk only', 'Duct tape'], answer: 0, explanation: 'Rodents chew through foam and caulk. Copper mesh stops them, and the sealant holds it in.', whyNot: [null, 'Rodents chew through foam.', 'Rodents chew through caulk alone.', 'Tape does not stop rodents at all.'] },
  { id: 'cc-wdo-evidence', module: null, question: 'Fine, flour-like powder under tiny round holes in wood points to what?', choices: ['Powderpost beetles', 'Carpenter ants', 'Subterranean termites', 'Mice'], answer: 0, explanation: 'Powderpost beetle frass is fine like flour, below small round exit holes.', whyNot: [null, 'Carpenter ant frass is coarse and shredded, often with insect parts.', 'Termites leave mud tubes and soil, not powder.', 'Mice leave droppings and gnaw marks.'] },
  { id: 'cc-standing-water', module: null, question: 'Under Ninefold\'s mosquito SOP, how do you handle a pond or still ditch?', choices: ['No direct application into the water; keep fogging 20 to 30 feet back', 'Fog directly over the water', 'Pour granules into it', 'Ignore it'], answer: 0, explanation: 'The SOP says avoid direct application into ponds and keep a 20 to 30 foot fogging buffer. Treat resting areas instead.', whyNot: [null, 'Direct application into water is not allowed.', 'Granules into water is still direct application.', 'Point it out to the customer and note it.'] },
  { id: 'cc-joists', module: null, question: 'You see white fuzzy growth on floor joists in a crawlspace. What do you report?', choices: ['Fungal growth and excessive moisture, with a meter reading', 'Active termite infestation', 'Black mold that needs remediation', 'Nothing, it is just insulation dust'], answer: 0, explanation: 'Report what you see: fungal growth on the framing and the moisture behind it, with a meter reading and photos. Do not name a mold type.', whyNot: [null, 'Termites leave brown mud tubes, not white fuzz.', 'Techs do not identify mold types. Report growth and moisture only.', 'Fuzzy growth on wood is not dust. It means the wood stays damp.'] }
];
