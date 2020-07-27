const FORM_COUNT = 5;
const FORMS_DIR = "./test/data/forms";
// Read forms from form html files;
const decoder = new TextDecoder("utf-8");

const readFileStr = (file: string) => decoder.decode(Deno.readFileSync(file));

const forms = [...Array(FORM_COUNT).keys()].map((i) =>
  readFileStr(`${FORMS_DIR}/form${i + 1}.html`).replaceAll("'", "''")
);

const INTEGRATION_COUNT = 5;
const ABI_DIR = "./test/data/contracts";
// abi1 => storage.sol abi2=> owner.sol abi3 => ballot.sol abi4=> erc721.sol abi5=> erc20.sol
const ABIs = [...Array(INTEGRATION_COUNT).keys()].map((i) =>
  readFileStr(`${ABI_DIR}/abi${i + 1}.json`).replaceAll("'", "''")
);

const CONTRACT_ADDRESSES = [
  "0xE875927e83A6A009521cBbA9abbc5bfA42B946B3",
  "0xf875927e83A6A009521cBbA9abbc5bfA42B946B3",
  "0x3875927e83A6A009521cBbA9abbc5bfA42B946B3",
  "0x0000000000000000000000000000000000000000",
  "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
];
const CONTRACT_METHODS = [
  "store",
  "changeOwner",
  "vote",
  "transferFrom",
  "transfer",
];

export const POPULATE_USERS_QUERY = `
  insert into users (email,"password",session_id ) 
  values 
    ('abc1@example.com','hash1',null), 
    ('abc2@example.com','hash2',null), 
    ('abc3@example.com','hash3','session3secret'), 
    ('abc4@example.com','hash4',null), 
    ('abc5@example.com','hash5','session5secret') ;
`;
// TODO change static form access to a iteration
export const POPULATE_FORMS_QUERY = `
  insert into forms (user_id ,integration_id,page) 
  values (1,2,'${forms[0]}'), (2,1,'${forms[1]}'), (4,4,'${forms[2]}'), (2,3,'${forms[3]}'), (5,5,'${forms[4]}') ;
`;

export const POPULATE_INTEGRATIONS_QUERY =
  `
  insert into integrations (user_id,contract_address,contract_abi,contract_method)
  values ${[...Array(INTEGRATION_COUNT).keys()].map(
    (i) =>
      `(${i + 1},'${CONTRACT_ADDRESSES[i]}','${ABIs[i]}','${
        CONTRACT_METHODS[i]
      }')
  `
  )}
`.slice(0, -1) + ";";
