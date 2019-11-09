export default class Trade {
    private id: number;
    private entryDate: string;
    private exitDate: string;
    private ticker: string;
    private entryPrice: number;
    private exitPrice: number;
    private positionSize: number;
    private tradeType: string;
    private securityType: string;
    private tradeFee: number;
    private optionPremium: number;
    private userId: number;


	constructor($id: number, $entryDate: string, $exitDate: string, $ticker: string, $entryPrice: number, $exitPrice: number, $positionSize: number, $tradeType: string, $securityType: string, $tradeFee: number, $optionPremium: number, $userId: number) {
		this.id = $id;
		this.entryDate = $entryDate;
		this.exitDate = $exitDate;
		this.ticker = $ticker;
		this.entryPrice = $entryPrice;
		this.exitPrice = $exitPrice;
		this.positionSize = $positionSize;
		this.tradeType = $tradeType;
		this.securityType = $securityType;
		this.tradeFee = $tradeFee;
		this.optionPremium = $optionPremium;
		this.userId = $userId;
	}

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $entryDate
     * @return {Date}
     */
	public get $entryDate(): string {
		return this.entryDate;
	}

    /**
     * Getter $exitDate
     * @return {Date}
     */
	public get $exitDate(): string {
		return this.exitDate;
	}

    /**
     * Getter $ticker
     * @return {string}
     */
	public get $ticker(): string {
		return this.ticker;
	}

    /**
     * Getter $entryPrice
     * @return {number}
     */
	public get $entryPrice(): number {
		return this.entryPrice;
	}

    /**
     * Getter $exitPrice
     * @return {number}
     */
	public get $exitPrice(): number {
		return this.exitPrice;
	}

    /**
     * Getter $positionSize
     * @return {number}
     */
	public get $positionSize(): number {
		return this.positionSize;
	}

    /**
     * Getter $tradeType
     * @return {string}
     */
	public get $tradeType(): string {
		return this.tradeType;
	}

    /**
     * Getter $securityType
     * @return {string}
     */
	public get $securityType(): string {
		return this.securityType;
	}

    /**
     * Getter $tradeFee
     * @return {number}
     */
	public get $tradeFee(): number {
		return this.tradeFee;
	}

    /**
     * Getter $optionPremium
     * @return {number}
     */
	public get $optionPremium(): number {
		return this.optionPremium;
	}

    /**
     * Getter $userId
     * @return {number}
     */
	public get $userId(): number {
		return this.userId;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $entryDate
     * @param {Date} value
     */
	public set $entryDate(value: string) {
		this.entryDate = value;
	}

    /**
     * Setter $exitDate
     * @param {Date} value
     */
	public set $exitDate(value: string) {
		this.exitDate = value;
	}

    /**
     * Setter $ticker
     * @param {string} value
     */
	public set $ticker(value: string) {
		this.ticker = value;
	}

    /**
     * Setter $entryPrice
     * @param {number} value
     */
	public set $entryPrice(value: number) {
		this.entryPrice = value;
	}

    /**
     * Setter $exitPrice
     * @param {number} value
     */
	public set $exitPrice(value: number) {
		this.exitPrice = value;
	}

    /**
     * Setter $positionSize
     * @param {number} value
     */
	public set $positionSize(value: number) {
		this.positionSize = value;
	}

    /**
     * Setter $tradeType
     * @param {string} value
     */
	public set $tradeType(value: string) {
		this.tradeType = value;
	}

    /**
     * Setter $securityType
     * @param {string} value
     */
	public set $securityType(value: string) {
		this.securityType = value;
	}

    /**
     * Setter $tradeFee
     * @param {number} value
     */
	public set $tradeFee(value: number) {
		this.tradeFee = value;
	}

    /**
     * Setter $optionPremium
     * @param {number} value
     */
	public set $optionPremium(value: number) {
		this.optionPremium = value;
	}

    /**
     * Setter $userId
     * @param {number} value
     */
	public set $userId(value: number) {
		this.userId = value;
	}
    
}