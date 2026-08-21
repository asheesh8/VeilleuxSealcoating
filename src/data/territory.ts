/**
 * Service territory geography.
 *
 * Coordinates are real latitude/longitude, projected to SVG space at render
 * time, so towns land where they actually are rather than where they looked
 * about right. Vermont's outline is a simplified boundary trace — the Canadian
 * border across the top, the Connecticut River down the east, Massachusetts
 * along the bottom, and Lake Champlain up the west.
 */

export const BOUNDS = {
  lonMin: -73.52,
  lonMax: -71.38,
  latMin: 42.66,
  latMax: 45.08,
} as const

/** viewBox dimensions, sized to the real aspect ratio at Vermont's latitude. */
export const MAP_W = 330
export const MAP_H = 520

export function project(lat: number, lon: number): [number, number] {
  const x = ((lon - BOUNDS.lonMin) / (BOUNDS.lonMax - BOUNDS.lonMin)) * MAP_W
  const y = ((BOUNDS.latMax - lat) / (BOUNDS.latMax - BOUNDS.latMin)) * MAP_H
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10]
}

/** [lat, lon] tracing Vermont clockwise from the northwest corner. */
export const VERMONT: [number, number][] = [
  [45.01, -73.35],
  [45.01, -71.50],
  // Connecticut River, running south
  [44.80, -71.55],
  [44.65, -71.60],
  [44.50, -71.73],
  [44.40, -71.82],
  [44.30, -72.00],
  [44.20, -72.09],
  [44.10, -72.19],
  [43.95, -72.29],
  [43.80, -72.37],
  [43.70, -72.39],
  [43.60, -72.41],
  [43.50, -72.44],
  [43.35, -72.40],
  [43.20, -72.44],
  [43.05, -72.44],
  [42.95, -72.51],
  [42.85, -72.53],
  [42.73, -72.46],
  // Massachusetts
  [42.73, -73.26],
  // New York, then up the lake
  [43.00, -73.28],
  [43.30, -73.25],
  [43.55, -73.27],
  [43.62, -73.31],
  [43.80, -73.38],
  [44.00, -73.40],
  [44.20, -73.36],
  [44.40, -73.30],
  [44.55, -73.32],
  [44.70, -73.35],
  [44.85, -73.30],
]

/** Lake Champlain, drawn as a separate shape so the west edge reads correctly. */
export const CHAMPLAIN: [number, number][] = [
  [45.01, -73.35],
  [44.85, -73.30],
  [44.70, -73.35],
  [44.55, -73.32],
  [44.40, -73.30],
  [44.20, -73.36],
  [44.00, -73.40],
  [43.80, -73.38],
  [43.86, -73.44],
  [44.02, -73.45],
  [44.22, -73.42],
  [44.42, -73.38],
  [44.58, -73.40],
  [44.74, -73.43],
  [44.90, -73.40],
  [45.01, -73.44],
]

export interface Town {
  name: string
  county: County
  lat: number
  lon: number
  /** Essex is where the trucks start the day. */
  base?: boolean
}

export type County =
  | 'Chittenden'
  | 'Franklin'
  | 'Grand Isle'
  | 'Lamoille'
  | 'Washington'
  | 'Addison'

export const counties: County[] = [
  'Chittenden',
  'Franklin',
  'Grand Isle',
  'Lamoille',
  'Washington',
  'Addison',
]

export const towns: Town[] = [
  // Chittenden — the core route
  { name: 'Essex', county: 'Chittenden', lat: 44.4906, lon: -73.0879, base: true },
  { name: 'Essex Junction', county: 'Chittenden', lat: 44.4906, lon: -73.1109 },
  { name: 'Burlington', county: 'Chittenden', lat: 44.4759, lon: -73.2121 },
  { name: 'South Burlington', county: 'Chittenden', lat: 44.467, lon: -73.171 },
  { name: 'Winooski', county: 'Chittenden', lat: 44.4906, lon: -73.1868 },
  { name: 'Colchester', county: 'Chittenden', lat: 44.5439, lon: -73.1479 },
  { name: 'Williston', county: 'Chittenden', lat: 44.4373, lon: -73.079 },
  { name: 'Shelburne', county: 'Chittenden', lat: 44.3806, lon: -73.2276 },
  { name: 'Jericho', county: 'Chittenden', lat: 44.5023, lon: -72.9948 },
  { name: 'Underhill', county: 'Chittenden', lat: 44.5306, lon: -72.9037 },
  { name: 'Westford', county: 'Chittenden', lat: 44.6142, lon: -73.0132 },
  { name: 'Richmond', county: 'Chittenden', lat: 44.4034, lon: -72.9954 },
  { name: 'Hinesburg', county: 'Chittenden', lat: 44.3292, lon: -73.1104 },
  { name: 'Milton', county: 'Chittenden', lat: 44.6395, lon: -73.1104 },
  { name: 'Charlotte', county: 'Chittenden', lat: 44.3092, lon: -73.2593 },

  // Franklin
  { name: 'St. Albans', county: 'Franklin', lat: 44.8109, lon: -73.0832 },
  { name: 'Swanton', county: 'Franklin', lat: 44.9184, lon: -73.1243 },
  { name: 'Georgia', county: 'Franklin', lat: 44.7237, lon: -73.1268 },
  { name: 'Fairfax', county: 'Franklin', lat: 44.6656, lon: -73.0104 },

  // Grand Isle
  { name: 'South Hero', county: 'Grand Isle', lat: 44.6448, lon: -73.3037 },
  { name: 'Grand Isle', county: 'Grand Isle', lat: 44.7203, lon: -73.3009 },

  // Lamoille
  { name: 'Cambridge', county: 'Lamoille', lat: 44.6398, lon: -72.8798 },
  { name: 'Stowe', county: 'Lamoille', lat: 44.4654, lon: -72.6845 },
  { name: 'Morrisville', county: 'Lamoille', lat: 44.562, lon: -72.5981 },
  { name: 'Hyde Park', county: 'Lamoille', lat: 44.5934, lon: -72.6162 },
  { name: 'Johnson', county: 'Lamoille', lat: 44.6367, lon: -72.6801 },

  // Washington
  { name: 'Waterbury', county: 'Washington', lat: 44.3376, lon: -72.7565 },
  { name: 'Montpelier', county: 'Washington', lat: 44.2601, lon: -72.5754 },
  { name: 'Barre', county: 'Washington', lat: 44.197, lon: -72.502 },
  { name: 'Waitsfield', county: 'Washington', lat: 44.1906, lon: -72.8259 },

  // Addison
  { name: 'Vergennes', county: 'Addison', lat: 44.167, lon: -73.254 },
  { name: 'Bristol', county: 'Addison', lat: 44.1334, lon: -73.0787 },
  { name: 'Middlebury', county: 'Addison', lat: 44.0154, lon: -73.1673 },
]

export const base = towns.find((t) => t.base)!
