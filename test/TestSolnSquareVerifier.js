var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var SquareVerifier = artifacts.require('SquareVerifier');

const Proof = require('../square/proof.json');

let a = Proof['proof']['A'];
let a_p = Proof['proof']['A_p'];
let b = Proof['proof']['B'];
let b_p = Proof['proof']['B_p'];
let c = Proof['proof']['C'];
let c_p = Proof['proof']['C_p'];
let h = Proof['proof']['H'];
let k = Proof['proof']['K'];
let input = Proof['input'];

contract('TestSolnSquareVerifier', accounts => {
    
    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('verify proof', function () {
        beforeEach(async function () {
            const squareverifier = await SquareVerifier.new({from: account_one});
            this.contract = await SolnSquareVerifier.new(squareverifier.address, {from: account_one});
        });

    // Test if a new solution can be added for contract - SolnSquareVerifier
        it('if a new solution can be added', async function () {

            let result = await this.contract.addsolutions(a, a_p, b, b_p, c, c_p, h, k, input);

            assert.equal(result.logs[0].event, "Addsolution", 'could not add a solution');
        
        })


    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('if an ERC721 token can be minted', async function () {
            
            let result = false;
            
            await this.contract.addsolutions(a, a_p, b, b_p, c, c_p, h, k, input);

            try{
                await this.contract.mintNewUniqueToken(a, a_p, b, b_p, c, c_p, h, k, input, account_two, 10);
            }
            catch(e){
                console.log(e);
                result = true;
            }

            assert.equal(result, false, 'could not mint a token');
        })

        it('a solution can not be added twice', async function () {
            
            let result = false;
            await this.contract.addsolutions(a, a_p, b, b_p, c, c_p, h, k, input);
            
            try{
                await this.contract.addsolutions(a, a_p, b, b_p, c, c_p, h, k, input);
            }
            catch(e){
                result = true;
            }

            assert.equal(result, true, 'a solution has been added twice');
        })
    });
})