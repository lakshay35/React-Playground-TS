export default class User {
    private _fname: string;
    private _lname: string;
    private _email: string;
    private _password: string;


	constructor($fname: string, $lname: string, $email: string, $password: string) {
		this._fname = $fname;
		this._lname = $lname;
		this._email = $email;
		this._password = $password;
	}


    /**
     * Getter fname
     * @return {string}
     */
	public get fname(): string {
		return this._fname;
	}

    /**
     * Getter lname
     * @return {string}
     */
	public get lname(): string {
		return this._lname;
	}

    /**
     * Getter email
     * @return {string}
     */
	public get email(): string {
		return this._email;
	}

    /**
     * Getter password
     * @return {string}
     */
	public get password(): string {
		return this._password;
	}

    /**
     * Setter fname
     * @param {string} value
     */
	public set fname(value: string) {
		this._fname = value;
	}

    /**
     * Setter lname
     * @param {string} value
     */
	public set lname(value: string) {
		this._lname = value;
	}

    /**
     * Setter email
     * @param {string} value
     */
	public set email(value: string) {
		this._email = value;
	}

    /**
     * Setter password
     * @param {string} value
     */
	public set password(value: string) {
		this._password = value;
    }
    
    public toString = () => {
        return JSON.stringify({
            fname: this.fname,
            lname: this.lname,
            email: this.email,
            password: this.password
        });
    }

}