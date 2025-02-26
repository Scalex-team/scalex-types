import { Endpoint, HttpMethods, IUser} from "../../generic";

export interface IUpdateProfilePayload {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
}

export interface IUpdateAddressPayload {
	country: string;
	state: string;
	city: string;
	postalCode: string;
	address: string;
	utilityBill: string;
}

export interface IUpdateAddressResponse {
    customer: Partial<IUser>
}

export interface IUpdateProfileResponse {
    customer: Partial<IUser>
}

export const UpdateProfileEndpoint: Endpoint = {
	method: HttpMethods.Patch,
	path: '/customer-profile',
	fullPath: '/customer-profile'
};

export const UpdateAddressEndpoint: Endpoint = {
	method: HttpMethods.Patch,
	path: '/customer-address',
	fullPath: '/customer-address'
};

export const RetrieveProfileEndpoint: Endpoint = {
	method: HttpMethods.Get,
	path: '/customer-profile',
	fullPath: '/customer-profile'
};
