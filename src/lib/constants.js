export const BEACON_NETWORK_COLUMNS = [
  { 
    id: 'beacon_dataset',
    label: "Beacon > Dataset",
    align: 'left',
    width: '30%'
  },
  {
    id: 'maturity',
    label: "Beacon Maturity",
    align: 'center',
    width: '20%'
  },
  {
    id: 'datasets_count',
    label: "nº of Datasets",
    align: 'right',
    numeric: true,
    width: '20%'
  },
  {
    id: 'response',
    label: "Response",
    width: '10%'
  },
  {
    id: 'detail',
    label: "",
    width: '10%'
  },
  {
    id: 'contact',
    label: "Contact",
    width: '10%'
  }
];

export const BEACON_NETWORK_COLUMNS_EXPANDED = {
  'beacon_dataset': '10%',
  'beacon_dataset_name': '60%',
  'beacon_dataset_response': '10%',
  'beacon_dataset_detail': '10%',
  'beacon_dataset_contact': '10%'
}