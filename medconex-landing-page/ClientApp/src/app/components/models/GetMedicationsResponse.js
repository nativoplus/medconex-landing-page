"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GetMedicationsResponse = /** @class */ (function () {
    function GetMedicationsResponse() {
    }
    return GetMedicationsResponse;
}());
exports.GetMedicationsResponse = GetMedicationsResponse;
var MedicationModel = /** @class */ (function () {
    function MedicationModel() {
        this.medicationId = 0;
        this.medicationName = '';
        this.userId = 0;
        this.userFullName = '';
        this.totalTaken = 0;
        this.totalMissed = 0;
        this.adherencePercentage = 0;
    }
    return MedicationModel;
}());
exports.MedicationModel = MedicationModel;
//# sourceMappingURL=GetMedicationsResponse.js.map