export const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] as const;
export const locations: Record<string, string[]> = {
  "Tamil Nadu": ["Chennai", "Coimbatore"],
  Karnataka: ["Bengaluru"],
  Telangana: ["Hyderabad"],
  Maharashtra: ["Mumbai"],
};
export type Donor = {
  id: number;
  name: string;
  group: string;
  city: string;
  state: string;
  area: string;
  lastDonation: string;
  available: boolean;
};
export const donors: Donor[] = [
  {
    id: 1,
    name: "Arjun Raman",
    group: "O+",
    city: "Chennai",
    state: "Tamil Nadu",
    area: "Adyar",
    lastDonation: "12 July 2026",
    available: true,
  },
  {
    id: 2,
    name: "Priya Menon",
    group: "A+",
    city: "Chennai",
    state: "Tamil Nadu",
    area: "Anna Nagar",
    lastDonation: "18 June 2026",
    available: true,
  },
  {
    id: 3,
    name: "Rahul Desai",
    group: "B+",
    city: "Mumbai",
    state: "Maharashtra",
    area: "Andheri",
    lastDonation: "21 May 2026",
    available: false,
  },
  {
    id: 4,
    name: "Sneha Kumar",
    group: "O-",
    city: "Bengaluru",
    state: "Karnataka",
    area: "Indiranagar",
    lastDonation: "09 August 2026",
    available: true,
  },
  {
    id: 5,
    name: "Vikram Rao",
    group: "AB+",
    city: "Hyderabad",
    state: "Telangana",
    area: "Banjara Hills",
    lastDonation: "03 July 2026",
    available: true,
  },
  {
    id: 6,
    name: "Meera Iyer",
    group: "B-",
    city: "Coimbatore",
    state: "Tamil Nadu",
    area: "RS Puram",
    lastDonation: "11 April 2026",
    available: false,
  },
  {
    id: 7,
    name: "Kiran Patel",
    group: "A-",
    city: "Mumbai",
    state: "Maharashtra",
    area: "Bandra",
    lastDonation: "14 June 2026",
    available: true,
  },
  {
    id: 8,
    name: "Ananya Reddy",
    group: "AB-",
    city: "Hyderabad",
    state: "Telangana",
    area: "Jubilee Hills",
    lastDonation: "20 May 2026",
    available: true,
  },
  {
    id: 9,
    name: "Dev Anand",
    group: "O+",
    city: "Coimbatore",
    state: "Tamil Nadu",
    area: "Peelamedu",
    lastDonation: "22 July 2026",
    available: true,
  },
];
export type Filters = {
  group?: string;
  state?: string;
  city?: string;
  location?: string;
  availability?: string;
};
export function filterDonors(filters: Filters) {
  return donors.filter(
    (d) =>
      (!filters.group || d.group === filters.group) &&
      (!filters.state || d.state === filters.state) &&
      (!filters.city || d.city === filters.city) &&
      (!filters.location ||
        `${d.area} ${d.city}`.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.availability ||
        (filters.availability === "available" ? d.available : !d.available)),
  );
}
export const requests = [
  {
    id: "BL-1042",
    group: "O-",
    hospital: "Lotus Care Hospital",
    city: "Chennai",
    units: 2,
    category: "Surgery support",
    urgency: "Urgent",
    date: "12 Nov 2026",
  },
  {
    id: "BL-1043",
    group: "B+",
    hospital: "Greenfield Medical Centre",
    city: "Bengaluru",
    units: 3,
    category: "Treatment support",
    urgency: "Priority",
    date: "12 Nov 2026",
  },
  {
    id: "BL-1044",
    group: "A+",
    hospital: "Harmony Community Hospital",
    city: "Coimbatore",
    units: 1,
    category: "Scheduled procedure",
    urgency: "Planned",
    date: "11 Nov 2026",
  },
  {
    id: "BL-1045",
    group: "AB-",
    hospital: "Sunrise Care Centre",
    city: "Hyderabad",
    units: 2,
    category: "Treatment support",
    urgency: "Priority",
    date: "11 Nov 2026",
  },
  {
    id: "BL-1046",
    group: "O+",
    hospital: "Harbour Medical Centre",
    city: "Mumbai",
    units: 2,
    category: "Surgery support",
    urgency: "Planned",
    date: "10 Nov 2026",
  },
];
export const banks = [
  {
    id: 1,
    name: "Lotus Community Blood Centre",
    organisation: "Lotus Care Foundation",
    city: "Chennai",
    address: "24 Garden Avenue, Adyar, Chennai",
    services: ["Whole blood", "Platelets", "Plasma"],
  },
  {
    id: 2,
    name: "Greenfield Blood Centre",
    organisation: "Greenfield Medical Network",
    city: "Bengaluru",
    address: "18 Park Road, Indiranagar, Bengaluru",
    services: ["Whole blood", "Plasma"],
  },
  {
    id: 3,
    name: "Harmony Donation Centre",
    organisation: "Harmony Community Trust",
    city: "Coimbatore",
    address: "52 Community Road, RS Puram, Coimbatore",
    services: ["Whole blood", "Platelets"],
  },
  {
    id: 4,
    name: "Sunrise Community Blood Centre",
    organisation: "Sunrise Care Foundation",
    city: "Hyderabad",
    address: "10 Wellness Avenue, Jubilee Hills, Hyderabad",
    services: ["Whole blood", "Plasma"],
  },
  {
    id: 5,
    name: "Harbour Blood Centre",
    organisation: "Harbour Health Trust",
    city: "Mumbai",
    address: "36 Seaside Road, Bandra, Mumbai",
    services: ["Whole blood", "Platelets", "Plasma"],
  },
];
export const stories = [
  {
    name: "Arjun R.",
    city: "Chennai",
    quote:
      "I used to think making a difference needed something big. Donating blood reminded me that a small act can mean everything.",
  },
  {
    name: "Priya M.",
    city: "Bengaluru",
    quote:
      "The first time I donated, I was nervous. The care and kindness of the team made it an experience I wanted to repeat.",
  },
  {
    name: "Rahul D.",
    city: "Mumbai",
    quote:
      "We may never meet the person we help. But knowing that we can be there for someone is a connection like no other.",
  },
];
export const education = [
  {
    title: "Blood Donation Eligibility",
    text: "Feeling well is a good starting point. Age, weight, haemoglobin, medication and donation intervals are assessed at the donation centre. Qualified medical personnel determine eligibility under applicable local guidelines.",
    icon: "shield",
  },
  {
    title: "The Donation Process",
    text: "A typical visit includes registration, a confidential health review, a brief examination, donation using sterile single-use equipment, and a period of rest with refreshments. Follow the centre’s preparation and aftercare instructions.",
    icon: "drop",
  },
  {
    title: "Benefits of Voluntary Donation",
    text: "Regular voluntary, unpaid donation supports a sustainable blood supply for people who need transfusions. Donation is an act of community support, not a medical treatment or a guaranteed health benefit for donors.",
    icon: "heart",
  },
  {
    title: "Myths vs Facts",
    text: "You cannot catch an infection from properly performed blood donation using sterile, single-use equipment. Not every blood group can be used for every patient: compatibility testing and clinical decisions belong to healthcare professionals.",
    icon: "book",
  },
];
