export const company = {
  name: 'Veilleux Sealcoating',
  legal: 'Veilleux Sealcoating LLC',
  owner: 'Matthew Veilleux',
  phone: '(802) 324-7189',
  phoneHref: 'tel:+18023247189',
  email: 'veilleuxsealcoating@yahoo.com',
  emailHref: 'mailto:veilleuxsealcoating@yahoo.com',
  city: 'Essex',
  state: 'Vermont',
  address: 'Essex, Vermont',
  territory: 'Vermont & Upstate New York',
  facebook: 'https://www.facebook.com/profile.php?id=100091450380437',
  instagram: 'https://www.instagram.com/veilleuxsealcoating/',
  tagline: 'Sealcoating & Property Services',
} as const

/* ------------------------------------------------------------------ services */

export type ServiceSlug =
  | 'sealcoating'
  | 'winter'
  | 'grounds'
  | 'spring-cleanup'
  | 'junk-removal'
  | 'handyman'

export interface Service {
  slug: ServiceSlug
  name: string
  short: string
  /** Nav + card summary. One sentence. */
  summary: string
  /** Page-level statement. */
  statement: string
  body: string[]
  includes: string[]
  season: string
  image: string
  detailImage: string
}

export const services: Service[] = [
  {
    slug: 'sealcoating',
    name: 'Sealcoating & Pavement',
    short: 'Sealcoating',
    summary:
      'Crack filling, pothole repair, line striping, and a two-coat seal that actually holds an edge.',
    statement: 'Anyone can spray it black. The job is everything that happens first.',
    body: [
      'Sealcoat is the last ten percent of the work. The ninety percent nobody photographs is the blowing, the edging, the wire-brushing along the shoulder, the oil-spot primer, and the crack filling — done in that order, and done before a drop of sealer comes off the truck.',
      'Skip that and you get a driveway that looks correct for about six weeks. The sealer sits on top of dirt instead of bonding to asphalt, lifts at the edges over the first winter, and by spring you are looking at gray again.',
      'We do the prep. Two coats where two coats are called for, cut clean to the lawn and the garage slab, and taped off at the street so nothing tracks. Then we stay off it for the cure and tell you exactly when you can drive on it.',
    ],
    includes: [
      'Blow-down, wire-brush, and hand edging',
      'Hot crack filling to 1/2" and above',
      'Pothole and alligator patching',
      'Oil-spot primer before seal',
      'Two-coat commercial-grade sealer',
      'Line striping, numbers, and ADA stalls',
    ],
    season: 'May through October',
    image: 'seal-sweep-wide',
    detailImage: 'edge-detail-lawn',
  },
  {
    slug: 'winter',
    name: 'Plowing & Winter',
    short: 'Winter',
    summary:
      'Residential and commercial snow plowing with salt and sand, on a route that runs all night.',
    statement: 'The lot is clear before your first car turns in.',
    body: [
      'Winter work is judged on one thing: whether the property is open when it needs to be open. That means we are moving during the storm, not after it, and the commercial route is timed against opening hours rather than against sunrise.',
      'Salt and sand as conditions call for it. We treat the spots that actually freeze — the shaded corner, the slope by the dumpster, the walk between the door and the handicapped stall — instead of running a blanket pass and calling it done.',
      'Seasonal contracts and per-storm work both available. Vermont and upstate New York.',
    ],
    includes: [
      'Residential driveways',
      'Commercial lots and access roads',
      'Salt and sand treatment',
      'Walkway and entry clearing',
      'Storm-timed commercial routes',
      'Seasonal or per-storm agreements',
    ],
    season: 'November through April',
    image: 'plow-truck-night',
    detailImage: 'plow-truck-snow',
  },
  {
    slug: 'grounds',
    name: 'Commercial Mowing & Grounds',
    short: 'Grounds',
    summary:
      'Route mowing, trimming, and property upkeep that keeps a commercial site looking managed.',
    statement: 'A property that looks maintained is a property people trust.',
    body: [
      'Commercial grounds work is a standing appointment, not a call-out. We run a route, we hit it on the same day each week, and the site looks the same every time somebody pulls in.',
      'Mowing, string trimming, blowing down the walks and the lot, and keeping the bed lines cut. The kind of upkeep that nobody compliments and everybody notices when it stops.',
    ],
    includes: [
      'Weekly route mowing',
      'String trimming and edging',
      'Walk and lot blow-down',
      'Bed-line cutting',
      'Seasonal trimming',
      'Commercial and multi-unit properties',
    ],
    season: 'May through October',
    image: 'mowing-rig',
    detailImage: 'commercial-yard',
  },
  {
    slug: 'spring-cleanup',
    name: 'Spring Cleanup',
    short: 'Spring Cleanup',
    summary:
      'Undo the winter: plow damage, sand, and debris cleared, then mulch, stone, or topsoil delivered.',
    statement: 'Winter leaves a mess. March is for taking it back.',
    body: [
      'Snow goes and leaves everything behind it — sand windrowed along the pavement edge, torn-up lawn where the blade caught, branches, matted leaves, and whatever the plow pushed into the beds.',
      'We clear all of it, repair what the winter tore up, and reset the beds. Mulch, stone, and topsoil available for delivery and placement at the same visit, so the property goes from post-winter to finished in one pass.',
    ],
    includes: [
      'Debris and branch removal',
      'Sand and winter-sand sweep-up',
      'Plow-damage lawn repair',
      'Bed cleanout and edging',
      'Mulch, stone, and topsoil delivery',
      'Placement and spreading',
    ],
    season: 'March through May',
    image: 'cleanup-brush',
    detailImage: 'seal-ranch-house',
  },
  {
    slug: 'junk-removal',
    name: 'Junk Removal & Hauling',
    short: 'Junk Removal',
    summary:
      'Non-trash haul-away for homes and businesses. Loaded, strapped, and gone the same day.',
    statement: 'Point at it. We load it and it leaves with us.',
    body: [
      'Garage cleanouts, a basement full of things that outlived their usefulness, an office reshuffle, a tenant turnover. We take non-trash items — furniture, appliances, construction debris, yard waste, and the general accumulation of a property that has been lived in.',
      'One-ton dump and trailer, so the truck holds more than a pickup and the job usually finishes in one trip.',
    ],
    includes: [
      'Garage and basement cleanouts',
      'Furniture and appliance removal',
      'Construction debris',
      'Tenant turnover clearing',
      'Commercial and office',
      'Same-day haul in most cases',
    ],
    season: 'Year-round',
    image: 'truck-bed-load',
    detailImage: 'truck-driveway-load',
  },
  {
    slug: 'handyman',
    name: 'Handyman & Repairs',
    short: 'Handyman',
    summary:
      'Carpentry, fixtures, trim, and paint. The list on the fridge that never gets shorter.',
    statement: 'No job too small is a slogan. Here it is just true.',
    body: [
      'Decks framed and rebuilt, tub surrounds reset, fixtures swapped, trim run, rooms cut in and rolled. The work that is too small for a general contractor to schedule and too large to keep putting off.',
      'Same crew that seals your driveway. You already know how we leave a site.',
    ],
    includes: [
      'Deck framing and repair',
      'Interior and exterior carpentry',
      'Fixture and hardware installs',
      'Trim and finish work',
      'Interior painting',
      'Small repairs and punch lists',
    ],
    season: 'Year-round',
    image: 'deck-frame',
    detailImage: 'interior-paint',
  },
]

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)

/* ------------------------------------------------------------------- process */

export const process = [
  {
    step: '01',
    name: 'Walk it with you',
    body: 'We measure, look at drainage, and find the cracks that matter. You get a written number, not a range shouted from the truck.',
  },
  {
    step: '02',
    name: 'Clear the surface',
    body: 'Blown down, wire-brushed at the edges, and scraped where the dirt has built a shoulder over the pavement. Sealer bonds to asphalt, never to dust.',
  },
  {
    step: '03',
    name: 'Fill and patch',
    body: 'Hot crack fill on anything half an inch or wider. Potholes cut square and patched. Alligatored sections repaired before they spread.',
  },
  {
    step: '04',
    name: 'Prime the stains',
    body: 'Oil and transmission spots get primer. Without it, sealer will not stick and the spot ghosts back through within a season.',
  },
  {
    step: '05',
    name: 'Cut the edge, then seal',
    body: 'Hand-edged along the lawn and the garage slab, taped at the street. Then two coats, brushed at the perimeter and squeegeed through the field.',
  },
  {
    step: '06',
    name: 'Tell you when to drive on it',
    body: 'Barricaded, and you get a real cure time based on the weather that day. Not a shrug and a wave.',
  },
]

/* -------------------------------------------------------------------- seasons */

export const seasons = [
  {
    name: 'Spring',
    months: 'March – May',
    lede: 'Clear the winter off',
    items: ['Spring cleanup', 'Sand and debris removal', 'Plow-damage repair', 'Mulch and topsoil'],
    slug: 'spring-cleanup' as ServiceSlug,
  },
  {
    name: 'Summer',
    months: 'May – August',
    lede: 'The sealcoating season',
    items: ['Crack filling', 'Sealcoating', 'Line striping', 'Weekly mowing'],
    slug: 'sealcoating' as ServiceSlug,
  },
  {
    name: 'Fall',
    months: 'September – November',
    lede: 'Get ahead of the freeze',
    items: ['Final seal window', 'Pothole repair', 'Cleanouts and hauling', 'Deck and carpentry'],
    slug: 'junk-removal' as ServiceSlug,
  },
  {
    name: 'Winter',
    months: 'November – April',
    lede: 'Keep it open',
    items: ['Snow plowing', 'Salt and sand', 'Commercial routes', 'Interior handyman work'],
    slug: 'winter' as ServiceSlug,
  },
]

/* ---------------------------------------------------------------- testimonials */

export const testimonials = [
  {
    quote:
      'Matt and his team did an awesome job on our 2800 sq. ft driveway. The attention to detail with the edging, brushing, and crack filling before sealing made the driveway look great! Highly recommend. We will definitely be using again in the future!',
    name: 'Kristina B.',
    detail: '2,800 sq ft residential driveway',
  },
  {
    quote:
      'Awesome experience with Matt right from initial request. He contacted me within a day (rare these days) and gave me a very reasonable quote to seal my driveway. We scheduled the work for a week that I would be out of town and Matt worked to ensure that they did a great job prepping the driveway and the end result came out very nice. Highly recommend!',
    name: 'Bob W.',
    detail: 'Residential driveway, scheduled around travel',
  },
]

/* -------------------------------------------------------------------- gallery */

export type WorkCategory = 'sealcoating' | 'commercial' | 'winter' | 'grounds' | 'handyman' | 'hauling'

export interface WorkItem {
  slug: string
  category: WorkCategory
  caption: string
  orientation: 'landscape' | 'portrait'
}

export const workCategories: { id: WorkCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'sealcoating', label: 'Sealcoating' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'winter', label: 'Winter' },
  { id: 'grounds', label: 'Grounds' },
  { id: 'handyman', label: 'Handyman' },
  { id: 'hauling', label: 'Hauling' },
]

export const work: WorkItem[] = [
  { slug: 'seal-residential-marker', category: 'sealcoating', caption: 'Fresh residential seal blocked off at the street while it cures.', orientation: 'landscape' },
  { slug: 'seal-two-story-home', category: 'sealcoating', caption: 'Two-car residential drive finished with an even, edge-to-edge coat.', orientation: 'landscape' },
  { slug: 'seal-landscaped-turn', category: 'sealcoating', caption: 'Curved residential drive sealed cleanly around mature landscaping.', orientation: 'landscape' },
  { slug: 'seal-country-lane', category: 'sealcoating', caption: 'Long wooded drive finished cleanly from the house to the road.', orientation: 'landscape' },
  { slug: 'seal-sweep-wide', category: 'sealcoating', caption: 'A long sweeping drive, brushed and sealed in a single day.', orientation: 'landscape' },
  { slug: 'night-garage-glow', category: 'sealcoating', caption: 'A cured drive under a garage light. A good seal reads like water.', orientation: 'landscape' },
  { slug: 'seal-colonial-tape', category: 'sealcoating', caption: 'Fresh seal on a colonial driveway, taped and cut clean to the apron.', orientation: 'landscape' },
  { slug: 'edge-detail-lawn', category: 'sealcoating', caption: 'The cut line where seal meets lawn. This is the part people notice.', orientation: 'portrait' },
  { slug: 'seal-wooded-curve', category: 'sealcoating', caption: 'A wooded approach sealed edge to edge, no overspray on the shoulder.', orientation: 'landscape' },
  { slug: 'seal-newbuild', category: 'sealcoating', caption: 'New construction sealed before handover.', orientation: 'landscape' },
  { slug: 'seal-drive-approach', category: 'sealcoating', caption: 'The approach shot: clean line, clean shoulder, no tracking.', orientation: 'portrait' },
  { slug: 'seal-tree-curve', category: 'sealcoating', caption: "Tree-lined drive, hand-edged where the machine can't reach.", orientation: 'landscape' },
  { slug: 'edge-detail-house', category: 'sealcoating', caption: 'Edged by hand so the boundary stays crisp after it cures.', orientation: 'portrait' },
  { slug: 'seal-blue-house', category: 'sealcoating', caption: 'A full residential drive restored to a deep, even black.', orientation: 'landscape' },
  { slug: 'edge-detail-colonial', category: 'sealcoating', caption: 'A straight edge held the full length of the drive.', orientation: 'portrait' },
  { slug: 'seal-gray-house', category: 'sealcoating', caption: 'Crack-filled and sealed ahead of the first freeze.', orientation: 'landscape' },
  { slug: 'edge-detail-mailbox', category: 'sealcoating', caption: 'Tight work around the mailbox post.', orientation: 'portrait' },
  { slug: 'seal-colonial-deep', category: 'sealcoating', caption: 'Two-coat finish on a residential drive in Essex.', orientation: 'landscape' },
  { slug: 'edge-detail-drive', category: 'sealcoating', caption: 'Edge held clean along the full run.', orientation: 'portrait' },
  { slug: 'seal-yellow-house', category: 'sealcoating', caption: 'Driveway and parking apron sealed to the garage slab.', orientation: 'landscape' },
  { slug: 'edge-detail-pine', category: 'sealcoating', caption: 'Sealed to the treeline, shoulder left clean.', orientation: 'portrait' },
  { slug: 'seal-ranch-house', category: 'sealcoating', caption: 'Ranch driveway sealed curb to garage.', orientation: 'landscape' },
  { slug: 'edge-detail-sign', category: 'sealcoating', caption: 'Sealed up to the fixture without a drop on the base.', orientation: 'portrait' },

  { slug: 'commercial-striped-finish', category: 'commercial', caption: 'Sealed commercial lot finished with clean parking lines.', orientation: 'portrait' },
  { slug: 'commercial-crack-prep', category: 'commercial', caption: 'Crack repair laid out before the final surface coat.', orientation: 'portrait' },
  { slug: 'commercial-crew-application', category: 'commercial', caption: 'Crew applying sealcoat across a large commercial lot.', orientation: 'landscape' },
  { slug: 'commercial-red-lot-wide', category: 'commercial', caption: 'Full commercial surface completed around the building and drainage.', orientation: 'landscape' },
  { slug: 'commercial-red-lot-edge', category: 'commercial', caption: 'Finished edge held clean along the building, plantings, and storm drain.', orientation: 'landscape' },
  { slug: 'commercial-seal-progress', category: 'commercial', caption: 'Mid-application view showing fresh seal against the existing pavement.', orientation: 'landscape' },
  { slug: 'commercial-access-aisle', category: 'commercial', caption: 'Parking and access aisle restored with crisp white striping.', orientation: 'landscape' },
  { slug: 'commercial-curb-line', category: 'commercial', caption: 'Freshly sealed storefront lot closed off while it cures.', orientation: 'landscape' },
  { slug: 'commercial-ada-marking', category: 'commercial', caption: 'Accessible parking markings refreshed after sealcoating.', orientation: 'landscape' },
  { slug: 'commercial-parking-detail', category: 'commercial', caption: 'Clean hatch lines and parking layout across the finished lot.', orientation: 'landscape' },
  { slug: 'night-commercial-lot', category: 'commercial', caption: 'Commercial lot sealed and restriped, photographed after dark.', orientation: 'landscape' },
  { slug: 'commercial-lot', category: 'commercial', caption: 'Retail lot maintenance: sealing, striping, and pothole repair.', orientation: 'landscape' },
  { slug: 'commercial-dock', category: 'commercial', caption: 'Dock approach prepped for patch and seal.', orientation: 'portrait' },
  { slug: 'commercial-bollard', category: 'commercial', caption: 'Loading dock apron, bollard base repaired.', orientation: 'portrait' },
  { slug: 'commercial-fence-line', category: 'commercial', caption: 'Fence-line pavement cleaned back before repair.', orientation: 'portrait' },
  { slug: 'commercial-yard', category: 'commercial', caption: 'Working yard kept clear and serviceable year-round.', orientation: 'portrait' },

  { slug: 'plow-truck-night', category: 'winter', caption: 'Two in the morning. Commercial route, Vermont and upstate New York.', orientation: 'landscape' },
  { slug: 'plow-truck-snow', category: 'winter', caption: 'First plowable snow, Chittenden County.', orientation: 'landscape' },
  { slug: 'plow-truck-autumn', category: 'winter', caption: 'Blade on before the first storm of the season.', orientation: 'landscape' },
  { slug: 'plow-field-dawn', category: 'winter', caption: 'Dawn after an overnight push.', orientation: 'portrait' },

  { slug: 'mowing-rig', category: 'grounds', caption: 'Commercial mowing rig staged for a route.', orientation: 'landscape' },
  { slug: 'cleanup-brush', category: 'grounds', caption: 'Spring cleanup: winter debris cleared and hauled.', orientation: 'portrait' },

  { slug: 'deck-frame', category: 'handyman', caption: 'Deck framed and decked for a repeat client.', orientation: 'landscape' },
  { slug: 'interior-paint', category: 'handyman', caption: 'Interior repaint, trimmed and cut in by hand.', orientation: 'landscape' },
  { slug: 'bath-surround', category: 'handyman', caption: 'Tub surround reset and sealed.', orientation: 'portrait' },
  { slug: 'bath-refresh', category: 'handyman', caption: 'Half-bath refresh: fixture, trim, and paint.', orientation: 'portrait' },

  { slug: 'truck-residential', category: 'hauling', caption: 'The rig that shows up. One-ton dump, Essex, Vermont.', orientation: 'landscape' },
  { slug: 'truck-bed-load', category: 'hauling', caption: 'Non-trash haul-away, loaded and strapped.', orientation: 'landscape' },
  { slug: 'truck-driveway-load', category: 'hauling', caption: 'Clean-out hauled off the same day.', orientation: 'landscape' },
  { slug: 'truck-loaded-autumn', category: 'hauling', caption: 'Loaded out at the end of a fall cleanup.', orientation: 'landscape' },
  { slug: 'hauling-rig', category: 'hauling', caption: 'Equipment trailer and dump staged on site.', orientation: 'landscape' },
  { slug: 'truck-lawn', category: 'hauling', caption: 'Junk removal pickup, residential.', orientation: 'landscape' },
]

/* ---------------------------------------------------------------- service area */

export const serviceArea = {
  primary: [
    'Essex',
    'Essex Junction',
    'Williston',
    'Colchester',
    'South Burlington',
    'Burlington',
    'Winooski',
    'Jericho',
    'Underhill',
    'Westford',
    'Milton',
    'Shelburne',
  ],
  extended:
    'Chittenden, Franklin, Lamoille, and Addison counties, plus commercial winter routes into upstate New York.',
}

export const facts = [
  { value: 'Essex, VT', label: 'Where we are based' },
  { value: '6', label: 'Services, one crew' },
  { value: '24 hrs', label: 'Typical quote turnaround' },
  { value: 'Year-round', label: 'Not just a summer outfit' },
]
