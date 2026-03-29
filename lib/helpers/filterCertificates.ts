import {Certificate} from "../types";
import {PfxListOptions} from "../core/modules/types";
import {PfxCertificate} from "../core/Certificate";

export default function(
    certificates: PfxCertificate[],
    filters?: PfxListOptions
) {
    if(! filters) return certificates

    return certificates.filter(certificate => {

        if(filters.isValid !== undefined){
            if(certificate.isValid() !== filters.isValid){
                return false
            }
        }

        if(filters.inn){
            const innList = Array.isArray(filters.inn) ? filters.inn : [filters.inn]
            if(! certificate.inn || ! innList.includes(certificate.inn)) return false;
        }

        if(filters.pinfl){
            const pinflList = Array.isArray(filters.pinfl) ? filters.pinfl : [filters.pinfl]
            if(! certificate.pinfl || ! pinflList.includes(certificate.pinfl)) return false;
        }

        // TODO[2703]: add legal filter

        if(filters.search){
            const q = filters.search.toLowerCase();

            const matchName = certificate.name?.toLowerCase().includes(q);
            const matchFullName = certificate.fullName?.toLowerCase().includes(q);
            const matchSurname = certificate.surname?.toLowerCase().includes(q);
            const matchOrganization = certificate.organization?.toLowerCase().includes(q);

            if(!matchName && !matchSurname && !matchOrganization && !matchFullName) return false;
        }

        return true;
    })
}