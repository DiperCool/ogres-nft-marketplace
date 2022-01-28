//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Ogres is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    event MintNftEvent(uint256 tokenId,
        string name,
        string tokenURI,
        address payable owner,
        uint256 price,
        bool forSale);
    event BuyOgreEvent(uint256 tokenId, address payable owner);
    event ToggleSaleEvent(uint256 tokenId, bool forSale);
    event ChangePriceEvent(uint256 tokenId, uint256 price);
    struct Ogre{
        uint256 tokenId;
        string name;
        string tokenURI;
        address payable owner;
        uint256 price;
        bool forSale;
    }
    mapping(uint256 => Ogre) public ogres;
    constructor() ERC721("Ogres", "OGR") { }

    function mintNFT(string memory name,uint256 price,string memory tokenURI) 
        public onlyOwner
        returns (uint256)
        {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(owner(), newItemId);
        _setTokenURI(newItemId, tokenURI);
        Ogre memory ogre = Ogre(
            newItemId,
            name,
            tokenURI,
            payable((owner())),
            price,
            true
        );
        ogres[newItemId]= ogre;
        emit MintNftEvent(newItemId,
            name,
            tokenURI,
            payable((owner())),
            price,
            true);
        return newItemId;
    }

    function buyOgre(uint256 tokenId) public payable {
        require(_exists(tokenId), "there isn't this token");
        Ogre memory ogre = ogres[tokenId];
        address tokenOwner = ownerOf(tokenId);
        require(msg.value >= ogre.price, "you have no money");
        require(ogre.forSale, "don't sale");
        address payable sendTo = ogre.owner;
        sendTo.transfer(msg.value);
        _transfer(tokenOwner, msg.sender, tokenId);
        ogre.owner = payable(msg.sender);
        ogre.forSale= false;
        ogres[tokenId]= ogre;
        emit BuyOgreEvent(tokenId, payable(msg.sender));
    }

    function toggleSale(uint256 tokenId)public {
        require(_exists(tokenId), "there isn't this token");
        require(ownerOf(tokenId)==msg.sender, "token is not your");
        Ogre memory ogre = ogres[tokenId];
        ogre.forSale= !ogre.forSale;
        ogres[tokenId]= ogre;
        emit ToggleSaleEvent(tokenId, ogre.forSale);
    }
    function setPrice(uint256 tokenId, uint256 newPrice) public{
        require(_exists(tokenId), "there isn't this token");
        require(ownerOf(tokenId)==msg.sender, "token is not you");
        Ogre memory ogre = ogres[tokenId];
        ogre.price= newPrice;
        ogres[tokenId]= ogre;
        emit ChangePriceEvent(tokenId, newPrice);
    }
    function getTotalOgres() public view returns(uint256){
        uint256 total = _tokenIds.current();
        return total;
    }
}
