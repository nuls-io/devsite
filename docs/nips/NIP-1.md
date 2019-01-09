# NIP-1 NIP Purpose and Guidelines

```
NIP: 1
Title: NIP Purpose and Guidelines
Status: Last call
Type: Process
Author: Lin Yang <lin@nuls.io>
Created: 2018-12-27
```

## **What is a NIP?**

NIP stands for NULS Improvement Proposal. A NIP is a design document providing information to the NULS community, and can be used for describing a new feature for NULS or its processes or environment. The NIP author is responsible for building consensus within the community and documenting dissenting opinions.

## Reasons for NIP 

- We intend NIPs to be the primary mechanisms for proposing major new features, for collecting community input on an issue, and for documenting the design decisions that have gone into NULS. Because the NIPs are maintained as text files in a versioned repository, their revision history is the historical record of the feature proposal.
- For NULS implementers, NIP is a convenient means to track their progress. Ideally, the maintainers of each feature will list the NIPs they have implemented. This provides a convenient way for users to understand the current status of a feature or library.

## NIP Types

There are six types of NIP:

- A Core NIP describes improvements in the NULS core code, such as consensus mechanisms, network protocols, etc.
- A Module NIP describes improvements in module submission and review requirements, such as the certain minimum criteria a NIP must meet to be accepted and merged into the module repository.
- An Interface NIP describes improvements in the specifications and standards of the NULS client API/RPC, such as API name and method name.
- An NRC Standards NIP describes improvements in application-level standards, such as contract standards, token standards, etc.
- An Informational NIP describes a NULS design issue or provides general guidelines or information to the NULS community--but does not propose a new feature. Informational NIPs do not necessarily represent a NULS community consensus or recommendation, so users and implementers are free to ignore Informational NIPs or follow their advice.
- A Process NIP describes improvements in all NULS-related operational processes, such as the ambassador election in the community. A Process NIP is not only a recommendation, but also a specification that community members need to follow to accomplish certain things, but it does not involve code-level specifications.

## NIP Work Flow

**The parties involved in the workflow include some or all of the following roles：**

- Most members of the community 

  The main responsibility is to participate in the discussion and voting of the NIPs, making constructive comments as well.

- NIP Authors

  Propose and improve NIPs and lead the community to discuss.

- NIP Editors

  Manage and edit NIPs.

- NULS Council

  The NIPs, about to “Final” or “Accepted”, can be rejected by the final decision of the Council via internal voting.

- NULS Core Developers

  They are responsible for the audit and code implementation of the Core, Module, NRC Standards and Interface NIPs.

Vetting an idea publicly before going as far as writing a NIP is meant to save your time. Asking the community first if an idea is original helps prevent too much time being spent on something that is guaranteed to be rejected based on prior discussions. It also helps to make sure the idea is applicable to the entire community and not just the author. Just because an idea sounds good to the author does not mean it will work for most people in most areas where NULS is used. We recommend that comments can be collected in the community via voting, and the results will also help the NIP editors to make quicker decisions on whether to merge the NIP.

A successful NIP requires the following stages:

```
  [ Draft ]->[ Last Call ]->[ Accepted ]->[ Final ]
```

Each change to the NIP status should be submitted by the NIP author as a pull request (PR), and the NIP editors will review the NIP. It's a good idea to add a link to the discussion post when you submit a PR.

**A complete NIP process is as follows:**

- The NIP author writes the NIP using the mandated format and style and shepherds the discussions in the community. The NIP author should first attempt to ascertain whether the idea is NIP-able, and then submit the NIP as a PR to the NIP repository, including a link to the discussion post. The NIP editors will handle these requests based on actual situation.
  - <span style="font-size: 18px; color: Dodgerblue;"><i class="fas fa-check-circle"></i></span>  **Draft:** Once approved, the NIP editors will assign the NIP a number and squash commit the pull request onto master. The NIP editors will not unreasonably deny a NIP.
  - <span style="font-size: 18px; color: Tomato;"><i class="fas fa-times-circle"></i></span>  **Draft:** Reasons for denying NIP status include being unfocused or too broad, duplication of effort, being technically unsound, not providing proper motivation or addressing backwards compatibility, or not in keeping with the NULS philosophy.
- Updates to drafts may also be submitted by the author as pull requests before it can be considered mature enough and ready for the next status.
  - <span style="font-size: 18px; color: Dodgerblue;"><i class="fas fa-check-circle"></i></span>  **Last call**: Once approved, the NIP editors will change the NIP status from Draft to last call and set the end date for the last call, usually 15 days.
  - <span style="font-size: 18px; color: Tomato;"><i class="fas fa-times-circle"></i></span>  **Last call**: Once the NIP has been published, it will be re-assigned to Draft status when necessary revisions are made on the NIP. We hope that a NIP will enter last call status only once to avoid unnecessary controversy in the community.
- The NIP in last call status will be pinned at https://nuls.community/
  - <span style="font-size: 18px; color: Dodgerblue;"><i class="fas fa-check-circle"></i></span>  **Accepted (involved in Core, Module, NRC Standards and Interface NIPs only):** If there are no major revisions or open technical issues, the status of the NIP through the last call period will be changed to “Accepted” by the NIP editors.
  - <span style="font-size: 18px; color: Dodgerblue;"><i class="fas fa-check-circle"></i></span>  **Final (involved in Informational and Process NIPs only):** If there are no major revisions or open technical issues, the status of the NIP through the last call period will be changed to “Final” by the NIP editors.
  - <span style="font-size: 18px; color: Tomato;"><i class="fas fa-times-circle"></i></span>  **Last call:** The NIP will be re-assigned to Draft status if there are material changes or technical issues raised by the community cannot be solved during the last call period. In addition, if the Council has different views on the NIP, a vote can be initiated within the Council members. If more than 70% of the Council members reject the NIP (giving reasons), the NIP will be re-assigned to “Draft” status or directly “Rejected” according to actual reasons.



- Once the Core, Module, NRC Standards and Interface NIPs have been accepted, the NULS core developers must implement the NIPs in the form of code before they can be considered “Final”.
  - <span style="font-size: 18px; color: Dodgerblue;"><i class="fas fa-check-circle"></i></span>  **Final (involved in Core, Module, NRC Standards and Interface NIPs only):**  After the NIP is implemented in the form of code, and is running on the main-net stably for certain amount of time or has become effectively verified, with changes recognized by the community as well, the status can be changed to "Final".

Other exceptional statuses are:

- **Deferred:**  Once the Core, Module, NRC Standards and Interface NIPs have been accepted, the developers do not complete the reference implementation as scheduled.
- **Rejected:**  A NIP can also be “Rejected”. Perhaps core developers reject to propose an implementation or the Council finds it unfeasible.
- **Superseded:** A NIP used to “Final”, but it is no longer considered the most advanced. Another better NIP appears, referring to this NIP, and becomes the Final status.

## What belongs in a successful NIP? 

Each NIP should have the following parts:

- **Preamble:** RFC 822 style headers containing meta-data about the NIP, including the NIP number, a short descriptive title (limited to a maximum of 44 characters), the names, and optionally the contact info for each author, etc. See NIP Header Preamble for details.
- **Summary:** The NIP author needs to provide a simple and understandable summary of the NIP for the general public. If you can't explain it in a simple way, it means that you don't fully understand it.
- **Abstract:**  A short (~200 word) description of the technical issue being addressed.
- **Motivation:** The motivation is critical for NIPs that want to change the NULS protocol. It should clearly explain why the existing protocol specification is inadequate to address the problem that the NIP solves. NIP submissions without sufficient motivation may be rejected outright.
- **Specification:** The technical specification should describe the syntax and semantics of any new feature. The specification should be detailed enough to allow competing, interoperable implementations for any of the current NULS platforms (NULS client, explorer).
- **Rationale:** The rationale fleshes out the specification by describing what motivated the design and why particular design decisions were made. It should describe alternate designs that were considered and related work, e.g. how the feature is supported in other languages. The rationale should provide evidence of consensus within the community and discuss important objections or concerns raised during discussion.
- **Backwards Compatibility:** All NIPs that introduce backwards incompatibilities must include a section describing these incompatibilities and their severity. The NIP must explain how the author proposes to deal with these incompatibilities. NIP submissions without a sufficient backwards compatibility treatise may be rejected outright.
- **Test Cases:** For NIPs that affect the consensus mechanism, test cases for their implementation must be provided.
- **Reference Implementation:** The reference implementation must be completed before any NIP is given status "Final", but it need not be completed before the NIP is accepted.
- **History:** History records show the whole process of the NIP from being proposed to the Final state, which can be displayed as additional links.


## NIP Formats and Templates

NIP should be written in markdown format.

## NIP Header Preamble

Each NIP must use the RFC 822 style as the head of the document. The headers must be arranged in the following order. The headers marked with * are optional, others are required.

```
  Title: < NIP title>
  Author: <list of authors' real names and optionally, email addrs>
* Discussions-To: < links to official discussion channels>
  Status: <Draft | Accepted | Final | Superseded | Deferred | Rejected>
  Type: <Core | Module | Interface | NRC Standards | Informational | Process>
  Created: <date created on, in ISO 8601 (yyyy-mm-dd) format>
* Replaces: < NIP number>
* Superseded-By: < NIP number>
```

## Auxiliary Files

NIPs may include auxiliary files such as diagrams. Auxiliary files must be named NIP-XXXX-Y.ext, where "XXXX" is the NIP number, "Y" is a serial number (starting at 1), and "ext" is replaced by the actual file extension (e.g. "png").

## Transferring NIP Ownership

It occasionally becomes necessary to transfer ownership of NIPs to a new champion. In general, we'd like to retain the original author as a co-author of the transferred NIP, but that's really up to the original author. A good reason to transfer ownership is because the original author no longer has the time or interest in updating it or following through with the NIP process or has fallen off the face of the 'net' (i.e. is unreachable or not responding to email). A bad reason to transfer ownership is because you don't agree with the direction of the NIP. We try to build consensus around a NIP, but if that's not possible, you can always submit a competing NIP.

If you are interested in assuming ownership of a NIP, send a message asking to take over, addressed to both the original author and the NIP editors. If the original author doesn't respond to email in a timely manner, the NIP editors will make a unilateral decision (it's not like such decisions can't be reversed).

## NIP Editors

The current NIP editors are:

```
Niels <Niels@nuls.io>
Pen <Pen@nuls.io>
```



## NIP Editor Responsibilities

For each new NIP that comes in an editor does the following:

- Read the NIP to check if it is ready: sound and complete. The ideas in the NIP must make technical sense, even if they don’t seem likely to be accepted.
- The title should accurately describe the content.
- Skim the NIP for obvious defects in language (spelling, grammar, sentence structure, etc.), markup (for Github style), and code style.

If the NIP isn't ready, an editor will send it back to the author for revision, with specific instructions. Once the NIP is ready for the repository, a NIP editor will:

- Assign a NIP number (usually a PR number)
- Merge the pull request
- Send email back to the NIP author with next steps

Many NIPs are written and maintained by developers with write access to the NULS codebase. The NIP editors monitor NIP changes, and correct any structure, grammar, spelling, or markup mistakes they see. NIP editors don't pass judgment on NIPs. They merely do the administrative and editorial part.


## History

This document was derived heavily from Bitcoin's [Bitcoin's BIP-0001](https://github.com/bitcoin/bips), written by Amir Taake, and the text he wrote was mainly from [Python's PEP-0001](https://www.python.org/dev/peps/). According to this situation, NIP makes some modifications based on their documents, such as adding the Council in the NIP process, modifying NIP types, etc. Please direct all comments to the NULS NIP editors.



<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css">

​    