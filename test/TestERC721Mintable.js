var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const account_five = accounts[4];
    const account_six = accounts[5];
    const account_seven = accounts[6];

    const tokenId_one = 1;
    const tokenId_two = 2;
    const tokenId_three = 3;
    const tokenId_four = 4;
    const tokenId_five = 5;
    const tokenId_six = 6;

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two, tokenId_one, {from: account_one});
            await this.contract.mint(account_three, tokenId_two, {from: account_one});
            await this.contract.mint(account_four, tokenId_three, {from: account_one});
            await this.contract.mint(account_five, tokenId_four, {from: account_one});
            await this.contract.mint(account_six, tokenId_five, {from: account_one});
        })

        it('should return total supply', async function () { 
            

            let result = await this.contract.totalSupply();
            
            assert.equal(result, 5, 'wrong total supply');
        })

        it('should get token balance', async function () {
            
            let result = await this.contract.balanceOf(account_three);

            assert.equal(result, 1, 'wrong total balance');
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            
            let result = await this.contract.tokenURI(tokenId_one);

            assert.equal(result, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1', 'wrong token uri');
        })

        it('should transfer token from one owner to another', async function () { 
            
            let result = false;

            try{
                await this.contract.transferFrom(account_four, account_five, tokenId_three, {from: account_four});
            }
            catch(e){
                result = true;
            }

            assert.equal(result, false, 'could not transfer token');
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
            let result = false;
            
            try{
                await this.contract.mint(account_seven, tokenId_six, {from: account_two});
            }
            catch(e){
                result = true;
            }

            assert.equal(result, true, 'require contract owner failed');
        })

        it('should return contract owner', async function () { 
            
            let result = await this.contract.getowner.call();

            assert.equal(result, account_one, 'wrong contract owner');
        })

    });
})
