/* tslint:disable */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {GoogleGenAI, LiveServerMessage, Modality, Session} from '@google/genai';
import {LitElement, css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {createBlob, decode, decodeAudioData} from './utils';
import './visual-3d';

const HOC_KNOWLEDGE = `the detail the third-party fees associated with branch registration, limited company (LTD) incorporation, and VAT/tax ID registration across various European countries. Below is a comprehensive breakdown of the information, organized by country and service type, with explanations of price differences based on the regulatory and administrative frameworks outlined in the documents.

---

### **1. Branch Registration Fees**
Branch registration involves establishing a branch of a foreign company in a given country. Fees vary due to differences in registration processes, notarial requirements, and administrative costs.

#### **Northern & Western Europe**
- **Austria (€1,728)**
  - **Registration Fee**: €250 (Firmenbuch/Commercial Register processing).
  - **Notary Fee**: €1,500 (extensive document verification, legalization, and representation before authorities).
  - **Government Fee**: €200 (additional administrative costs for multiple government agencies).
  - **Explanation**: Austria’s high fees stem from its complex registration process and extensive notarial requirements, reflecting a layered compliance system typical of federal jurisdictions.

- **Belgium (€415)**
  - **Details**: Not fully specified in the explanation document, but the summary lists a total of €415, indicating lower notarial and administrative costs compared to Austria.
  - **Explanation**: Belgium’s moderate fees suggest a less complex process than Austria or France, with fewer notarial requirements.

- **Denmark (€80)**
  - **Details**: Not fully detailed, but the low fee aligns with Denmark’s investment in digital business infrastructure, reducing administrative costs.
  - **Explanation**: Denmark’s streamlined digital processes result in some of the lowest fees in Western Europe.

- **France (€1,850)**
  - **Registration Fee**: €250 (Registre du Commerce et des Sociétés, RCS processing).
  - **Notary Fee**: €1,500 (extensive notarization, including certified translations and authentication of foreign documents).
  - **Government Fee**: €100 (administrative processing, including publication in official journals).
  - **Explanation**: France’s high fees are driven by extensive notarial requirements and government-mandated processes, including certified translations, making it one of the costlier options.

- **Germany (€899)**
  - **Details**: Not fully detailed, but the fee reflects Germany’s complex federal system, likely including registration and notarial costs.
  - **Explanation**: Germany’s fees are moderate compared to France and Austria, but higher than Denmark and the Netherlands due to notarial involvement and federal compliance layers.

- **Netherlands (€80)**
  - **Registration Fee**: €80 (fixed Chamber of Commerce, KVK fee).
  - **Notary Fee**: None required for branch registration.
  - **Explanation**: The Netherlands offers the lowest third-party costs in Western Europe due to a simple registration process with no notarial requirements, supported by efficient digital infrastructure.

- **Ireland (€50)**
  - **Details**: Not fully detailed, but the low fee aligns with Ireland’s common law system, which simplifies processes.
  - **Explanation**: Ireland’s minimal fees reflect a straightforward registration process with minimal professional involvement.

- **Finland (€380)**
  - **Details**: Not fully detailed, but the fee suggests moderate administrative and registration costs.
  - **Explanation**: Finland’s efficient administrative systems keep fees relatively low compared to France or Austria.

- **Luxembourg (€675)**
  - **Details**: Not detailed, but the fee indicates moderate notarial and administrative costs.
  - **Explanation**: Luxembourg’s fees are higher than Denmark or the Netherlands due to some notarial involvement but lower than France or Austria.

- **Sweden (€200)**
  - **Details**: Not detailed, but the low fee aligns with Northern Europe’s efficient administrative systems.
  - **Explanation**: Sweden’s streamlined processes contribute to low third-party costs.

#### **Southern Europe**
- **Spain (€1,050)**
  - **Registration Fee**: €250 (Registro Mercantil/Commercial Registry processing).
  - **Notary Fee**: €500 (document notarization and certification, including translation of foreign documents).
  - **Government Fee**: €300 (tax office registration and regional requirements).
  - **Explanation**: Spain’s fees are moderate, driven by traditional paper-based systems and notarial requirements, though less extensive than France or Austria.

- **Italy (€1,300)**
  - **Registration Fee**: €500 (Registro delle Imprese/Business Register processing).
  - **Notary Fee**: €600 (extensive documentation requirements, fees based on document complexity and liability).
  - **Government Fee**: €200 (Chamber of Commerce processing).
  - **Explanation**: Italy’s fees reflect a complex process with significant notarial involvement and traditional administrative requirements.

- **Greece (€1,100)**
  - **Details**: Not fully detailed, but the fee suggests moderate notarial and registration costs.
  - **Explanation**: Greece’s traditional systems and notarial requirements result in higher fees than Northern European countries but lower than France.

- **Portugal (€900)**
  - **Details**: Not detailed, but the fee indicates moderate costs, likely including notarial and registration fees.
  - **Explanation**: Portugal’s fees align with Southern Europe’s reliance on notarial processes and traditional systems.

- **Cyprus (€840)**
  - **Details**: Not detailed, but the fee suggests moderate administrative and notarial costs.
  - **Explanation**: Cyprus’s fees are lower than Italy’s but higher than Eastern European countries, reflecting a balance between streamlined and traditional processes.

- **Malta (€695)**
  - **Details**: Not detailed, but the fee indicates moderate costs, likely due to simplified processes to attract international business.
  - **Explanation**: Malta’s fees are competitive, reflecting efforts to streamline processes for foreign businesses.

#### **Eastern Europe**
- **Poland (€600)**
  - **Registration Fee**: €200 (National Court Register, KRS processing).
  - **Notary Fee**: €300 (document certification and verification).
  - **Government Fee**: €100 (additional administrative processing).
  - **Explanation**: Poland’s moderate fees reflect a balance between modernized processes and traditional notarial requirements.

- **Estonia (€190)**
  - **Registration Fee**: €190 (Commercial Register fee, no notarization required).
  - **Explanation**: Estonia’s low fees are due to its advanced digital infrastructure, eliminating notarial requirements and streamlining registration.

- **Bulgaria (€450)**
  - **Details**: Not fully detailed, but the fee suggests low registration and notarial costs.
  - **Explanation**: Bulgaria’s modernized processes result in lower fees compared to Southern Europe.

- **Croatia (€550)**
  - **Details**: Not detailed, but the fee indicates moderate costs.
  - **Explanation**: Croatia’s fees reflect a mix of modern and traditional requirements, higher than Estonia but lower than Southern Europe.

- **Czech Republic (€600)**
  - **Details**: Not detailed, but the fee suggests moderate registration and notarial costs.
  - **Explanation**: Similar to Poland, the Czech Republic balances modernized and traditional processes.

- **Hungary (€750)**
  - **Details**: Not detailed, but the fee indicates moderate costs, likely including notarial and registration fees.
  - **Explanation**: Hungary’s fees are higher than Estonia’s due to traditional requirements like document translation.

- **Latvia (€500)**
  - **Details**: Not detailed, but the fee suggests moderate costs.
  - **Explanation**: Latvia’s modernized processes keep fees relatively low.

- **Lithuania (€450)**
  - **Details**: Not detailed, but the fee indicates low costs.
  - **Explanation**: Lithuania’s streamlined processes align with Eastern Europe’s cost-effective approach.

- **Romania (€500)**
  - **Details**: Not detailed, but the fee suggests moderate costs.
  - **Explanation**: Romania’s fees reflect modernized processes with some traditional requirements.

- **Slovakia (€600)**
  - **Details**: Not detailed, but the fee suggests moderate registration and notarial costs.
  - **Explanation**: Slovakia’s fees are similar to Poland’s, balancing modern and traditional systems.

- **Slovenia (€700)**
  - **Details**: Not detailed, but the fee indicates moderate costs.
  - **Explanation**: Slovenia’s fees are higher than Estonia’s due to some notarial and administrative requirements.

---

### **2. Limited Company (LTD) Incorporation Fees**
LTD incorporation is more complex than branch registration, involving legal processes like drafting articles of association, capital verification, and notarial involvement, resulting in higher fees.

#### **Northern & Western Europe**
- **Austria (€2,500, GmbH)**
  - **Details**: Not fully detailed, but the fee reflects Austria’s complex process with significant notarial and registration costs.
  - **Explanation**: Austria’s high fees are due to extensive notarial requirements and federal compliance layers.

- **Belgium (€1,200, SRL/BV)**
  - **Details**: Not detailed, but the fee suggests moderate notarial and registration costs.
  - **Explanation**: Belgium’s fees are lower than Austria’s due to less complex processes.

- **Denmark (€350, ApS)**
  - **Details**: Not detailed, but the low fee aligns with Denmark’s digital infrastructure.
  - **Explanation**: Denmark’s streamlined processes make it one of the most cost-effective options for LTD incorporation.

- **France (€2,500, SAS/SARL)**
  - **Notary Fee**: €2,000 (extensive verification of funding documents, articles of association, and certified translations).
  - **Registration Fee**: €300 (RCS processing and verification).
  - **Publication Fee**: €200 (mandatory legal announcement in an official journal).
  - **Explanation**: France’s high fees reflect extensive notarial requirements and mandatory publications, typical of civil law jurisdictions.

- **Germany (€1,500, GmbH/UG)**
  - **Notary Fee**: €1,000 (preparation of articles of association, shareholder decisions, and capital verification).
  - **Registration Fee**: €300 (Commercial Register processing and publication).
  - **Bank Fee**: €200 (capital deposit verification and bank account setup).
  - **Explanation**: Germany’s fees are driven by notarial involvement and federal compliance requirements, though lower than France or Austria.

- **Netherlands (€799, BV)**
  - **Notary Fee**: €599 (notarial deed of incorporation, verifying articles of association and shareholder information).
  - **Registration Fee**: €200 (KVK registration and processing).
  - **Explanation**: The Netherlands’ moderate fees reflect a balance between notarial requirements and efficient digital processes.

- **Ireland (€2,500, LTD)**
  - **Details**: Not detailed, but the high fee suggests more complex processes than branch registration.
  - **Explanation**: Despite Ireland’s common law system, LTD incorporation involves higher costs due to legal and administrative requirements.

- **Finland (€380, OY)**
  - **Details**: Not detailed, but the low fee aligns with Finland’s efficient systems.
  - **Explanation**: Finland’s streamlined processes keep LTD incorporation costs low.

- **Luxembourg (€1,500, SARL)**
  - **Details**: Not detailed, but the fee indicates moderate notarial and registration costs.
  - **Explanation**: Luxembourg’s fees are higher than Denmark’s due to notarial involvement.

- **Sweden (€1,900, AB)**
  - **Details**: Not detailed, but the fee suggests higher costs than Denmark or Finland.
  - **Explanation**: Sweden’s fees reflect more complex processes than other Northern European countries.

#### **Southern Europe**
- **Italy (€2,000, SRL)**
  - **Notary Fee**: €1,500 (preparation of formation deed, articles of association, based on company capital and document complexity).
  - **Registration Fee**: €300 (Business Register processing).
  - **Chamber Fee**: €200 (Chamber of Commerce registration and processing).
  - **Explanation**: Italy’s high fees are driven by extensive notarial involvement and traditional administrative systems.

- **Spain (€2,500, SL)**
  - **Notary Fee**: €1,700 (preparation and execution of formation deed and articles of association).
  - **Registration Fee**: €500 (Commercial Registry processing).
  - **Tax Fee**: €300 (initial tax registration and processing).
  - **Explanation**: Spain’s fees reflect traditional paper-based systems and significant notarial requirements.

- **Greece (€1,500, EPE/IKE)**
  - **Details**: Not detailed, but the fee suggests moderate notarial and registration costs.
  - **Explanation**: Greece’s fees align with Southern Europe’s reliance on notarial processes.

- **Portugal (€1,800, LDA)**
  - **Details**: Not detailed, but the fee indicates moderate costs.
  - **Explanation**: Portugal’s fees reflect traditional systems and notarial involvement.

- **Cyprus (€1,950, LTD)**
  - **Details**: Not detailed, but the fee suggests higher costs than Eastern Europe.
  - **Explanation**: Cyprus’s fees are driven by legal and administrative requirements for LTD incorporation.

- **Malta (€1,700, LTD)**
  - **Details**: Not detailed, but the fee indicates moderate costs.
  - **Explanation**: Malta’s fees are competitive, reflecting efforts to attract international business.

#### **Eastern Europe**
- **Bulgaria (€650, EOOD/OOD)**
  - **Notary Fee**: €350 (document verification and signature authentication).
  - **Registration Fee**: €200 (Commercial Register processing).
  - **Bank Fee**: €100 (capital deposit verification).
  - **Explanation**: Bulgaria’s low fees reflect modernized processes with minimal notarial requirements.

- **Estonia (€285, OU)**
  - **Registration Fee**: €150 (Commercial Register electronic filing).
  - **State Fee**: €75 (additional administrative processing).
  - **Explanation**: Estonia’s low fees are due to its advanced digital infrastructure, making it the most cost-effective option for LTD incorporation in the EU.

- **Poland (€1,200, SP.Z.O.O)**
  - **Details**: Not detailed, but the fee suggests moderate notarial and registration costs.
  - **Explanation**: Poland’s fees reflect a balance between modern and traditional requirements.

- **Croatia (€850, D.O.O.)**
  - **Details**: Not detailed, but the fee indicates moderate costs.
  - **Explanation**: Croatia’s fees are higher than Estonia’s due to some notarial involvement.

- **Czech Republic (€1,300, S.R.O.)**
  - **Details**: Not detailed, but the fee suggests moderate costs.
  - **Explanation**: The Czech Republic’s fees align with Poland’s, reflecting similar processes.

- **Hungary (€800, KFT)**
 Dávid - **Details**: Not detailed, but the fee suggests moderate costs.
  - **Explanation**: Hungary’s fees are higher than Estonia’s due to traditional requirements like document translation.

- **Latvia (€750, SIA)**
  - **Details**: Not detailed, but the fee suggests moderate costs.
  - **Explanation**: Latvia’s modernized processes keep fees relatively low.

- **Lithuania (€600, UAB)**
  - **Details**: Not detailed, but the fee indicates low costs.
  - **Explanation**: Lithuania’s streamlined processes result in cost-effective incorporation.

- **Romania (€700, SRL)**
  - **Details**: Not detailed, but the fee suggests moderate costs.
  - **Explanation**: Romania’s fees reflect modernized processes with some traditional requirements.

- **Slovakia (€900, S.R.O.)**
  - **Details**: Not detailed, but the fee suggests moderate costs.
  - **Explanation**: Slovakia’s fees are similar to Poland’s, balancing modern and traditional systems.

- **Slovenia (€1,200, D.O.O.)**
  - **Details**: Not detailed, but the fee indicates moderate costs.
  - **Explanation**: Slovenia’s fees are higher than Estonia’s due to some notarial and administrative requirements.

---

### **3. VAT/Tax ID Registration Fees**
VAT/tax ID registration fees vary based on requirements for fiscal representation, documentation, and verification procedures.

#### **Northern & Western Europe**
- **Austria (€620)**
  - **Details**: Not fully detailed, but the fee suggests costs for tax advisor verification and administrative processing.
  - **Explanation**: Austria’s high fees reflect complex compliance requirements in a federal system.

- **Belgium (€245)**
  - **Details**: Not detailed, but the low fee suggests minimal professional involvement.
  - **Explanation**: Belgium’s efficient processes result in lower VAT registration costs.

- **Denmark (€550)**
  - **Details**: Not detailed, but the fee aligns with Denmark’s digital infrastructure, though some professional involvement may be required.
  - **Explanation**: Denmark’s fees are moderate due to streamlined processes.

- **France (€630)**
  - **Fiscal Representation**: €350 (mandatory for non-EU businesses, with joint liability).
  - **Document Processing**: €280 (extensive documentation requirements).
  - **Explanation**: France’s high fees are driven by mandatory fiscal representation and complex tax laws.

- **Germany (€350)**
  - **Details**: €350 (mandatory tax advisor verification for non-resident businesses by the Finanzamt).
  - **Explanation**: Germany’s fees are moderate, reflecting mandatory professional involvement but efficient processes.

- **Netherlands (€0)**
  - **Details**: No third-party fees required; registration is done directly with the Belastingdienst.
  - **Explanation**: The Netherlands’ zero-cost VAT registration is unique, thanks to its digital infrastructure and lack of intermediary requirements.

- **Ireland (€550)**
  - **Details**: Not detailed, but the fee suggests moderate costs for documentation and processing.
  - **Explanation**: Ireland’s common law system keeps fees moderate but higher than the Netherlands.

- **Finland (€550)**
  - **Details**: Not detailed, but the fee aligns with Northern Europe’s efficient systems.
  - **Explanation**: Finland’s fees are moderate, reflecting streamlined processes.

- **Luxembourg (€550)**
  - **Details**: Not detailed, but the fee suggests moderate costs.
  - **Explanation**: Luxembourg’s fees are similar to other Northern European countries with efficient systems.

- **Sweden (€550)**
  - **Details**: Not detailed, but the fee indicates moderate costs.
  - **Explanation**: Sweden’s efficient administrative systems keep fees moderate.

#### **Southern Europe**
- **Italy (€850)**
  - **Fiscal Code Registration**: €550.
  - **Document Processing**: €300.
  - **Explanation**: Italy’s high fees reflect a complex tax system requiring extensive documentation and local representation.

- **Spain (€600)**
  - **NIE Processing and Fiscal Representation**: €600 (mandatory for foreign business representatives).
  - **Explanation**: Spain’s fees are driven by the requirement for an NIE and fiscal representation for non-resident businesses.

- **Greece (€720)**
  - **Details**: Not detailed, but the high fee suggests significant documentation and processing costs.
  - **Explanation**: Greece’s traditional systems result in higher fees than Northern Europe.

- **Portugal (€640)**
  - **Details**: Not detailed, but the fee indicates moderate costs.
  - **Explanation**: Portugal’s fees reflect traditional tax systems with some professional involvement.

- **Cyprus (€530)**
  - **Details**: Not detailed, but the fee suggests moderate costs.
  - **Explanation**: Cyprus’s fees are competitive, reflecting efforts to attract international business.

- **Malta (€560)**
  - **Details**: Not detailed, but the fee indicates moderate costs.
  - **Explanation**: Malta’s fees are moderate, aligning with its business-friendly environment.

#### **Eastern Europe**
- **Bulgaria (€575)**
  - **Details**: Not detailed, but the fee suggests moderate costs for documentation and processing.
  - **Explanation**: Bulgaria’s modernized processes keep fees relatively low.

- **Estonia (€550)**
  - **Details**: €550 (specialized documentation preparation and submission to the Estonian Tax and Customs Board).
  - **Explanation**: Despite Estonia’s digital infrastructure, VAT registration involves some professional costs.

- **Poland (€550)**
  - **Details**: Not detailed, but the fee suggests moderate costs.
  - **Explanation**: Poland’s fees reflect a balance between modern and traditional tax processes.

- **Croatia (€580)**
  - **Details**: Not detailed, but the fee indicates moderate costs.
  - **Explanation**: Croatia’s fees are slightly higher than Estonia’s due to some traditional requirements.

- **Czech Republic (€550)**
  - **Details**: Not detailed, but the fee suggests moderate costs.
  - **Explanation**: The Czech Republic’s fees align with Eastern Europe’s cost-effective approach.

- **Hungary (€600)**
  - **Standard Processing**: €550.
  - **Translation Fees**: €50 (mandatory professional translation of documents).
  - **Explanation**: Hungary’s fees are higher due to translation requirements and traditional processes.

- **Latvia (€550)**
  - **Details**: Not detailed, but the fee suggests moderate costs.
  - **Explanation**: Latvia’s modernized processes keep fees low.

- **Lithuania (€550)**
  - **Details**: Not detailed, but the fee indicates low costs.
  - **Explanation**: Lithuania’s streamlined processes result in cost-effective VAT registration.

- **Romania (€590)**
  - **Details**: Not detailed, but the fee suggests moderate costs.
  - **Explanation**: Romania’s fees reflect modernized processes with some traditional requirements.

- **Slovakia (€550)**
  - **Details**: Not detailed, but the fee suggests moderate costs.
  - **Explanation**: Slovakia’s fees align with Eastern Europe’s cost-effective approach.

- **Slovenia (€550)**
  - **Details**: Not detailed, but the fee indicates moderate costs.
  - **Explanation**: Slovenia’s fees are competitive, reflecting streamlined processes.

---

### **4. Price Differences Explanation**
The variation in fees across EU countries is attributed to the following factors, as outlined in the explanation document:

1. **Digital Infrastructure Differences**:
   - Countries like **Estonia**, **Denmark**, and **Ireland** leverage advanced digital systems, reducing administrative and professional costs (e.g., Estonia’s €190 branch registration and €0 VAT registration in the Netherlands).
   - Southern European countries (**Italy**, **Spain**, **Greece**) rely on traditional paper-based systems, requiring extensive notarization and increasing costs.

2. **Legal System Variations**:
   - **Civil law countries** (e.g., Germany, France, Italy) emphasize notarial involvement, leading to higher fees (e.g., France’s €1,500 notary fee for branch registration).
   - **Common law jurisdictions** (e.g., Ireland) have simpler, less expensive processes (e.g., €50 for branch registration).

3. **Regulatory Complexity**:
   - Federal systems (**Germany**, **Austria**) involve multiple compliance layers, increasing costs (e.g., Austria’s €1,728 branch registration).
   - Smaller countries (**Estonia**, **Malta**) streamline processes to attract international business, resulting in lower fees.

4. **Administrative Efficiency**:
   - Northern European countries (**Denmark**, **Sweden**, **Finland**) have efficient administrative systems, reducing costs.
   - Eastern European countries have modernized rapidly but may retain traditional requirements (e.g., Hungary’s mandatory translation fees).

5. **Professional Services Requirements**:
   - Some countries mandate notaries or tax advisors (e.g., Germany’s €350 tax advisor fee for VAT registration).
   - Others allow direct filing with minimal professional involvement (e.g., Netherlands’ €0 VAT registration).

---

### **5. Summary Table**
Below is a consolidated table summarizing the fees and entity types from the "House of Companies Product Price Summary.pdf":

| **Country**       | **Branch Registration Fee** | **LTD Registration Fee** | **Entity Type** | **Tax ID Registration Fee** |
|-------------------|----------------------------|--------------------------|-----------------|----------------------------|
| Austria           | €1,728                    | €2,500                  | GmbH            | €620                      |
| Belgium           | €415                      | €1,200                  | SRL/BV          | €245                      |
| Bulgaria          | €450                      | €650                    | EOOD/OOD        | €575                      |
| Croatia           | €550                      | €850                    | D.O.O.          | €580                      |
| Cyprus            | €840                      | €1,950                  | LTD             | €530                      |
| Czech Republic    | €600                      | €1,300                  | S.R.O.          | €550                      |
| Denmark           | €80                       | €350                    | ApS             | €550                      |
| Estonia           | €190                      | €285                    | OU              | €550                      |
| Finland           | €380                      | €380                    | OY              | €550                      |
| France            | €1,850                    | €2,500                  | SAS/SARL        | €630                      |
| Germany           | €899                      | €1,500                  | GmbH/UG         | €350                      |
| Greece            | €1,100                    | €1,500                  | EPE/IKE         | €720                      |
| Hungary           | €750                      | €800                    | KFT             | €600                      |
| Ireland           | €50                       | €2,500                  | LTD             | €550                      |
| Italy             | €1,300                    | €2,000                  | SRL             | €850                      |
| Latvia            | €500                      | €750                    | SIA             | €550                      |
| Lithuania         | €450                      | €600                    | UAB             | €550                      |
| Luxembourg        | €675                      | €1,500                  | SARL            | €550                      |
| Malta             | €695                      | €1,700                  | LTD             | €560                      |
| Netherlands       | €80                       | €799                    | BV              | €0                        |
| Poland            | €600                      | €1,200                  | SP.Z.O.O.       | €550                      |
| Portugal          | €900                      | €1,800                  | LDA             | €640                      |
| Romania           | €500                      | €700                    | SRL             | €590                      |
| Slovakia          | €600                      | €900                    | S.R.O.          | €550                      |
| Slovenia          | €700                      | €1,200                  | D.O.O.          | €550                      |
| Spain             | €1,050                    | €2,500                  | SL              | €600                      |
| Sweden            | €200                      | €1,900                  | AB              | €550                      |

---

### **6. Notes on Data Gaps**
- The "House of Companies Product Price Calculation Explanation.pdf" is incomplete for some countries (e.g., Belgium, Denmark, Ireland), and specific fee breakdowns aremissing. The summary document provides total fees, which are used to fill gaps where possible.
- The "Core Subscription Branch Plan" section on PAGE1 of the explanation document is incomplete and lacks specific pricing or valuation details for the Virtual Office Solution, Workflow Management System, and Document Processing System.
- Some countries (e.g., Croatia, Latvia, Lithuania) lack detailed fee breakdowns in the explanation document but are included in the summary table.

---

### **7. Additional Information**
- **House of Companies**: The fees reflect House of Companies’ experience with service providers across Europe, representing actual costs for entrepreneurs.
- **Estonia’s Advantage**: Estonia consistently offers the lowest fees for branch registration (€190), LTD incorporation (€285), and competitive VAT registration (€550) due to its advanced digital infrastructure.
- **Netherlands’ VAT Registration**: The Netherlands stands out with €0 third-party fees for VAT registration, making it the most cost-effective option for this service.
- **High-Cost Countries**: France, Austria, and Italy have the highest fees due to extensive notarial requirements and complex administrative systems.
---

### **House of Companies - India Services and Pricing**
---
**About House of Companies India**
House of Companies in India is a premier corporate service provider dedicated to assisting foreign companies and investors with their business setup and ongoing management in the Indian market. As part of the global House of Companies Group, they leverage international expertise with deep local knowledge to offer a seamless and efficient experience. Their team consists of seasoned professionals, including chartered accountants, company secretaries, and lawyers, who provide comprehensive support across all stages of the business lifecycle.

**Core Services**

**1. Market Entry & Company Setup**
*   **Private Limited Company Formation:** The most common and recommended structure for foreign investors.
    *   **Process:** Includes Director Identification Number (DIN), Digital Signature Certificate (DSC), name reservation, drafting of Memorandum of Association (MoA) and Articles of Association (AoA), filing incorporation documents, and obtaining the Certificate of Incorporation, PAN, and TAN.
*   **Branch Office Setup:** For foreign companies wishing to conduct business activities like manufacturing and trading in India. Requires RBI approval.
*   **Liaison Office Setup:** Ideal for market research, promoting products/services, and acting as a communication link. Cannot undertake commercial activities.
*   **Project Office Setup:** A temporary office for a specific project contract awarded to a foreign company in India.
*   **Limited Liability Partnership (LLP) Formation:** A flexible business structure combining partnership and corporate benefits.

**2. Ongoing Compliance & Advisory**
*   **Corporate Secretarial Services:**
    *   Maintenance of statutory registers and records.
    *   Preparation and filing of annual returns with the Registrar of Companies (ROC).
    *   Assistance with board meetings, shareholder meetings, and minutes.
    *   Ensuring full compliance with the Indian Companies Act, 2013.
*   **Accounting & Bookkeeping:**
    *   Day-to-day transaction recording.
    *   Preparation of annual financial statements (Balance Sheet, P&L Account).
    *   Management Information System (MIS) reporting.
*   **Taxation Services:**
    *   **Direct Tax:** Corporate tax planning, advance tax computation, filing of annual income tax returns.
    *   **Indirect Tax (GST):** GST registration, monthly/quarterly GST return filings (GSTR-1, GSTR-3B), annual GST return, and GST reconciliation.
    *   **Withholding Tax (TDS):** Calculation of TDS on payments, deposit of TDS, and filing of quarterly TDS returns.
*   **FDI & FEMA Compliance:**
    *   Advisory on Foreign Direct Investment (FDI) regulations.
    *   Compliance with the Foreign Exchange Management Act (FEMA), including reporting of foreign investment to the RBI.
*   **Payroll Management:**
    *   Monthly salary processing.
    *   Statutory deductions (PF, ESI, TDS).
    *   Issuance of payslips.
*   **Intellectual Property:**
    *   **Trademark Registration:** Search, application, and registration services to protect your brand identity.

**3. Other Essential Services**
*   **Virtual Office:** Provides a registered business address in major Indian cities, including mail handling and forwarding, without the cost of a physical office.
*   **Bank Account Opening Assistance:** Guidance and support in opening a corporate bank account in India.

**Pricing Structure (India)**

**Formation Packages**
*   **Company Formation (For Foreign Nationals):**
    *   **Standard (1 Foreign Director):** €999
    *   **Premium (2 Foreign Directors):** €1,399
    *   *Includes:* DIN, DSC, Name Approval, Incorporation Certificate, MoA & AoA, PAN, TAN, Bank Account Opening Assistance.
*   **Branch / Liaison / Project Office Setup:**
    *   **Fee:** €1,499
    *   *Includes:* RBI/AD Bank Approval, Registration with ROC, PAN, TAN, Bank Account Opening Assistance.

**Annual Compliance Packages (Private Limited Company)**
*   **Starter:** €1,999 / year
    *   *Best for:* Dormant companies or those with minimal activity.
    *   *Includes:* Bookkeeping (up to 200 transactions), Annual ROC Filing, Annual Tax Filing.
*   **Growth:** €2,999 / year
    *   *Best for:* Growing businesses with moderate transaction volume.
    *   *Includes:* Everything in Starter + Bookkeeping (up to 500 transactions), Quarterly TDS Returns.
*   **Scale:** €4,999 / year
    *   *Best for:* Established businesses requiring comprehensive support.
    *   *Includes:* Everything in Growth + Bookkeeping (up to 1000 transactions), Monthly GST Filing, Payroll (up to 5 employees), FEMA Compliance.

**Individual Service Pricing**
*   **GST Registration:** €199
*   **Trademark Registration:** €249
*   **Virtual Office Address:** Starting from €49 / month
---
### **House of Companies - General Pricing Plans & Services**

---
#### **Pricing Plans**
Choose the plan that best fits your business needs.

**1. STARTER (Free Plan)**
*   **Description:** Get started with basics.
*   **Price:** €0/month (for the first 3 months).
*   **Features:**
    *   Virtual EU office
    *   Phone number
    *   25 credits
    *   AI Market Entry Strategy
    *   Basic AI tools

**2. eBranch Plan (MOST POPULAR)**
*   **Description:** Most popular for businesses.
*   **Price:** €1,995/year (Discounted from €2,495).
*   **Features:**
    *   All features from the Free Plan.
    *   Financial Reporting Portal
    *   AI Mailbox
    *   Registered office
    *   VAT/EORI/Employer registration
    *   Quarterly VAT filing
    *   Annual Corporate Analysis
    *   AI Corporate Agent
    *   *Note:* Lifetime deal available during April–May.

**3. PREMIUM (Enterprise Plan)**
*   **Description:** For scaling businesses.
*   **Price:** Custom Pricing.
*   **Features:**
    *   All features from the eBranch Plan.
    *   Customized Portal
    *   Dedicated Manager
    *   Priority Support
    *   Flexible Add-ons

---
#### **Core Services**
Essential services for your international expansion.

*   **Virtual Office (Popular):** Professional business address and mail handling.
*   **Local Entity Setup (Popular):** Company registration and legal structure.
*   **VAT ID Application:** European VAT registration for tax compliance.
*   **VAT Filing:** Quarterly VAT return submissions.
*   **Annual Financial Reports (Popular):** Complete financial statements and compliance.

---
#### **Add-on Services**
Enhance your plan with these additional services.

*   **Corporate Tax Filing:** €125 for annual tax filing assistance.
*   **VAT Return Filing:** €175 for quarterly VAT return filing assistance.
*   **Annual Report Preparation (Popular):** €395 for annual financial statement preparation.
*   **Payroll Management (Popular):** €25/month per employee.
*   **Professional Employment Service:** €175/month per employee.
*   **Residency Permit Application:** €550 for assistance with residency applications.
*   **AI Business Plan Preparation:** €295 for a customized business plan for your expansion.
---
If a question cannot be answered from the knowledge base provided, respond with: "Please visit the House of Companies website to find this information."
`;

@customElement('gdm-live-audio')
export class GdmLiveAudio extends LitElement {
  @state() isRecording = false;
  @state() status = '';
  @state() error = '';

  private client: GoogleGenAI;
  private session: Session;
  private inputAudioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)({sampleRate: 16000});
  private outputAudioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)({sampleRate: 24000});
  @state() inputNode = this.inputAudioContext.createGain();
  @state() outputNode = this.outputAudioContext.createGain();
  private nextStartTime = 0;
  private mediaStream: MediaStream;
  private sourceNode: AudioBufferSourceNode;
  private scriptProcessorNode: ScriptProcessorNode;
  private sources = new Set<AudioBufferSourceNode>();

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 400px;
      height: 85vh;
      max-height: 800px;
      background-color: #1a1a2e;
      border-radius: 24px;
      position: relative;
      overflow: hidden;
      font-family: 'Roboto', sans-serif;
      color: white;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    @media (min-width: 768px) {
      :host {
        max-width: 800px;
        height: 70vh;
        max-height: 650px;
      }
    }

    .container {
      width: 100%;
      height: 100%;
      position: relative;
    }

    gdm-live-audio-visuals-3d {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .header {
      position: absolute;
      top: 24px;
      left: 24px;
      right: 24px;
      z-index: 2;
      background: linear-gradient(90deg, #ff5858, #f857a6);
      border-radius: 16px;
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .icon-container {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-container svg {
      width: 28px;
      height: 28px;
    }

    .title-container h1 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 500;
    }

    .title-container p {
      margin: 0;
      font-size: 0.875rem;
      opacity: 0.9;
    }

    .status-box {
      position: absolute;
      top: 130px;
      left: 24px;
      right: 24px;
      z-index: 2;
      background: rgba(30, 41, 59, 0.7);
      color: #a7f3d0;
      padding: 12px 16px;
      border-radius: 12px;
      text-align: center;
      font-size: 0.9rem;
      min-height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(5px);
      transition: all 0.3s ease;
    }

    .status-box.error {
      background: rgba(127, 29, 29, 0.8);
      color: #fca5a5;
    }

    .controls {
      position: absolute;
      bottom: 30px;
      left: 0;
      right: 0;
      z-index: 2;
      display: flex;
      justify-content: center;
    }

    #conversationButton {
      border: none;
      color: white;
      padding: 14px 28px;
      font-size: 1rem;
      font-weight: 500;
      border-radius: 28px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      min-width: 220px;
      text-transform: uppercase;
      letter-spacing: 1px;
      background: linear-gradient(90deg, #ff5858, #f857a6);
    }

    #conversationButton:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    #conversationButton.recording {
      background: #ff5858;
    }
  `;

  constructor() {
    super();
    this.status = '';
    this.initClient();
  }

  private initAudio() {
    this.nextStartTime = this.outputAudioContext.currentTime;
  }

  private async initClient() {
    this.initAudio();

    this.client = new GoogleGenAI({
      apiKey: process.env.API_KEY,
    });

    this.outputNode.connect(this.outputAudioContext.destination);

    this.initSession();
  }

  private async initSession() {
    const model = 'gemini-2.5-flash-preview-native-audio-dialog';

    try {
      this.session = await this.client.live.connect({
        model: model,
        callbacks: {
          onopen: () => {
            this.updateStatus('');
          },
          onmessage: async (message: LiveServerMessage) => {
            this.error = '';
            const audio =
              message.serverContent?.modelTurn?.parts[0]?.inlineData;

            if (audio) {
              this.nextStartTime = Math.max(
                this.nextStartTime,
                this.outputAudioContext.currentTime
              );

              const audioBuffer = await decodeAudioData(
                decode(audio.data),
                this.outputAudioContext,
                24000,
                1
              );
              const source = this.outputAudioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(this.outputNode);
              source.addEventListener('ended', () => {
                this.sources.delete(source);
              });

              source.start(this.nextStartTime);
              this.nextStartTime = this.nextStartTime + audioBuffer.duration;
              this.sources.add(source);
            }

            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
              for (const source of this.sources.values()) {
                source.stop();
                this.sources.delete(source);
              }
              this.nextStartTime = 0;
            }
          },
          onerror: (e: ErrorEvent) => {
            this.updateError(e.message);
          },
          onclose: (e: CloseEvent) => {
            this.updateStatus('Connection closed. Please refresh.');
          },
        },
        config: {
          systemInstruction: HOC_KNOWLEDGE,
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {prebuiltVoiceConfig: {voiceName: 'Orus'}},
          },
        },
      });
    } catch (e) {
      console.error(e);
      this.updateError(e.message);
    }
  }

  private updateStatus(msg: string) {
    this.status = msg;
    this.error = '';
  }

  private updateError(msg: string) {
    this.error = msg;
  }

  private async startRecording() {
    if (this.isRecording) {
      return;
    }
    this.error = '';
    this.inputAudioContext.resume();

 

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      this.sourceNode = this.inputAudioContext.createMediaStreamSource(
        this.mediaStream
      );
      this.sourceNode.connect(this.inputNode);

      const bufferSize = 256;
      this.scriptProcessorNode = this.inputAudioContext.createScriptProcessor(
        bufferSize,
        1,
        1
      );

      this.scriptProcessorNode.onaudioprocess = (audioProcessingEvent) => {
        if (!this.isRecording) return;

        const inputBuffer = audioProcessingEvent.inputBuffer;
        const pcmData = inputBuffer.getChannelData(0);

        this.session.sendRealtimeInput({media: createBlob(pcmData)});
      };

      this.sourceNode.connect(this.scriptProcessorNode);
      this.scriptProcessorNode.connect(this.inputAudioContext.destination);

      this.isRecording = true;
      this.updateStatus('');
    } catch (err) {
      console.error('Error starting recording:', err);
      this.updateError(`Mic error: ${err.message}`);
      this.stopRecording();
    }
  }

  private stopRecording() {
    if (!this.mediaStream && !this.inputAudioContext) return;

    if (!this.isRecording) return;
    
    this.isRecording = false;

    if (this.scriptProcessorNode && this.sourceNode && this.inputAudioContext) {
      this.scriptProcessorNode.disconnect();
      this.sourceNode.disconnect();
    }

    this.scriptProcessorNode = null;
    this.sourceNode = null;

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    for (const source of this.sources.values()) {
      source.stop();
      this.sources.delete(source);
    }
    this.nextStartTime = 0;

    this.updateStatus('');
  }

  private toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  render() {
    const statusClasses = {
      'status-box': true,
      error: !!this.error,
    };
    return html`
      <div class="container">
        <div class="header">
          <div class="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#FFFFFF">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          </div>
          <div class="title-container">
            <h1>AI Voice Assistant</h1>
            <p>Powered by House of Companies</p>
          </div>
        </div>

        ${(this.error || this.status) ? html`
          <div class=${classMap(statusClasses)}>
            <p>${this.error || this.status}</p>
          </div>
        ` : ''}

        <gdm-live-audio-visuals-3d
          .inputNode=${this.inputNode}
          .outputNode=${this.outputNode}>
        </gdm-live-audio-visuals-3d>

        <div class="controls">
          <button
            id="conversationButton"
            class=${this.isRecording ? 'recording' : ''}
            @click=${this.toggleRecording}>
            ${this.isRecording ? 'Stop ' : 'Start '}
          </button>
        </div>
      </div>
    `;
  }
}