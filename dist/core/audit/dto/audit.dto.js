"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuditDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateAuditDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: false, type: () => Number, nullable: true }, method: { required: true, type: () => String }, url: { required: true, type: () => String }, status: { required: true, type: () => Number }, meta: { required: false, type: () => Object } };
    }
}
exports.CreateAuditDto = CreateAuditDto;
//# sourceMappingURL=audit.dto.js.map