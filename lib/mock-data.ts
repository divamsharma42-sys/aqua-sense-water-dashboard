// Mock sensor data for AquaSense Smart Water Management System

export interface SensorData {
  waterLevel: number;
  tds: number;
  turbidity: number;
  flowRate: number;
  qualityStatus: "Safe" | "Moderate" | "Unsafe";
  leakageDetected: boolean;
  dailyConsumption: number;
  tankCapacity: number;
}

export interface Alert {
  id: string;
  type: "warning" | "danger" | "info" | "success";
  title: string;
  message: string;
  sensor: string;
  timestamp: Date;
  severity: "low" | "medium" | "high" | "critical";
}

export const generateMockSensorData = (): SensorData => {
  const waterLevel = Math.floor(Math.random() * 100);
  const tds = Math.floor(Math.random() * 500) + 100;
  const turbidity = Math.round((Math.random() * 10) * 10) / 10;
  const flowRate = Math.floor(Math.random() * 20) + 5;
  
  let qualityStatus: "Safe" | "Moderate" | "Unsafe" = "Safe";
  if (tds > 400 || turbidity > 7) {
    qualityStatus = "Unsafe";
  } else if (tds > 300 || turbidity > 5) {
    qualityStatus = "Moderate";
  }

  return {
    waterLevel,
    tds,
    turbidity,
    flowRate,
    qualityStatus,
    leakageDetected: Math.random() > 0.9,
    dailyConsumption: Math.floor(Math.random() * 500) + 100,
    tankCapacity: 1000,
  };
};

export const generateMockAlerts = (): Alert[] => {
  const alertTypes = [
    { type: "danger" as const, title: "Low Water Level", message: "Water level has dropped below 20%", sensor: "Ultrasonic Sensor", severity: "critical" as const },
    { type: "warning" as const, title: "High TDS Detected", message: "TDS level exceeds recommended threshold", sensor: "TDS Sensor", severity: "high" as const },
    { type: "danger" as const, title: "Leakage Detected", message: "Abnormal water flow detected - possible leak", sensor: "Flow Sensor", severity: "critical" as const },
    { type: "warning" as const, title: "High Turbidity", message: "Water turbidity is above normal levels", sensor: "Turbidity Sensor", severity: "medium" as const },
    { type: "info" as const, title: "Scheduled Maintenance", message: "System maintenance scheduled for tomorrow", sensor: "System", severity: "low" as const },
    { type: "success" as const, title: "Water Quality Restored", message: "Water quality parameters are now within safe limits", sensor: "TDS Sensor", severity: "low" as const },
    { type: "warning" as const, title: "Overflow Risk", message: "Tank level approaching maximum capacity", sensor: "Ultrasonic Sensor", severity: "high" as const },
    { type: "danger" as const, title: "Unsafe Water Quality", message: "Multiple parameters indicate unsafe water conditions", sensor: "Multiple Sensors", severity: "critical" as const },
  ];

  return alertTypes.map((alert, index) => ({
    ...alert,
    id: `alert-${index}-${Date.now()}`,
    timestamp: new Date(Date.now() - Math.random() * 86400000 * 7),
  })).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const dailyUsageData = [
  { day: "Mon", usage: 320, target: 300 },
  { day: "Tue", usage: 280, target: 300 },
  { day: "Wed", usage: 350, target: 300 },
  { day: "Thu", usage: 290, target: 300 },
  { day: "Fri", usage: 310, target: 300 },
  { day: "Sat", usage: 250, target: 300 },
  { day: "Sun", usage: 220, target: 300 },
];

export const weeklyTrendData = [
  { week: "Week 1", consumption: 2100, quality: 92 },
  { week: "Week 2", consumption: 1950, quality: 88 },
  { week: "Week 3", consumption: 2200, quality: 95 },
  { week: "Week 4", consumption: 1800, quality: 91 },
];

export const qualityHistoryData = [
  { time: "6AM", tds: 280, turbidity: 3.2, ph: 7.1 },
  { time: "9AM", tds: 310, turbidity: 3.8, ph: 7.0 },
  { time: "12PM", tds: 340, turbidity: 4.2, ph: 6.9 },
  { time: "3PM", tds: 320, turbidity: 4.0, ph: 7.0 },
  { time: "6PM", tds: 300, turbidity: 3.5, ph: 7.2 },
  { time: "9PM", tds: 290, turbidity: 3.3, ph: 7.1 },
];

export const flowRateData = [
  { hour: "00:00", rate: 5 },
  { hour: "04:00", rate: 3 },
  { hour: "08:00", rate: 15 },
  { hour: "12:00", rate: 12 },
  { hour: "16:00", rate: 18 },
  { hour: "20:00", rate: 10 },
];

export const sensorActivityData = [
  { name: "Ultrasonic", readings: 1440, errors: 2 },
  { name: "TDS", readings: 1440, errors: 5 },
  { name: "Turbidity", readings: 1440, errors: 1 },
  { name: "Flow", readings: 1440, errors: 3 },
];

export const hardwareComponents = [
  {
    name: "Ultrasonic Sensor (HC-SR04)",
    description: "Measures water level using ultrasonic waves with high precision",
    specs: "Range: 2cm - 400cm, Accuracy: ±3mm",
    icon: "waves",
  },
  {
    name: "TDS Sensor",
    description: "Measures Total Dissolved Solids to assess water purity",
    specs: "Range: 0-1000ppm, Accuracy: ±10%",
    icon: "beaker",
  },
  {
    name: "Turbidity Sensor",
    description: "Detects water cloudiness and suspended particles",
    specs: "Range: 0-3000 NTU, Output: Analog",
    icon: "droplets",
  },
  {
    name: "Water Flow Sensor (YF-S201)",
    description: "Monitors water flow rate and detects abnormalities",
    specs: "Range: 1-30 L/min, Pulse: 450 pulses/L",
    icon: "gauge",
  },
  {
    name: "ESP32 Microcontroller",
    description: "Main processing unit with WiFi/Bluetooth connectivity",
    specs: "Dual-core, 240MHz, WiFi 802.11 b/g/n",
    icon: "cpu",
  },
];

export const projectFeatures = [
  "Real-time water level monitoring with animated visualization",
  "Water quality assessment using TDS and turbidity sensors",
  "Automated leak detection and alert system",
  "Historical data analytics and trend visualization",
  "Mobile-responsive dashboard for remote monitoring",
  "Smart notifications for critical water conditions",
];

export const futureScope = [
  "Integration with smart home systems (Google Home, Alexa)",
  "Machine learning for predictive maintenance",
  "Solar-powered sensor nodes for sustainability",
  "Community water management network",
  "Mobile app with push notifications",
  "Integration with municipal water systems",
];
