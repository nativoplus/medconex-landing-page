export class GetMedicationsResponse {
  adherenceDetails: MedicationModel[];
}

export class MedicationModel {
  medicationId: number = 0;
  medicationName: string = '';
  userId: number = 0;
  userFullName: string = '';
  totalTaken: number = 0;
  totalMissed: number = 0;
  adherencePercentage: number = 0;
}
