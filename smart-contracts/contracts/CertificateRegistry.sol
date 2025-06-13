// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {
    struct Certificate {
        string ipfsHash;
        address issuer;
        uint256 issuedAt;
    }

    mapping(bytes32 => Certificate) public certificates;

    event CertificateIssued(bytes32 indexed certId, address indexed issuer, string ipfsHash);

    function issueCertificate(bytes32 certId, string memory ipfsHash) public {
        require(certificates[certId].issuedAt == 0, "Certificate already exists");
        certificates[certId] = Certificate(ipfsHash, msg.sender, block.timestamp);
        emit CertificateIssued(certId, msg.sender, ipfsHash);
    }

    function verifyCertificate(bytes32 certId) public view returns (Certificate memory) {
        return certificates[certId];
    }
}