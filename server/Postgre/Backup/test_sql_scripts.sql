SELECT *,
    (SELECT COUNT(*) AS "Total" FROM "Ordering"."Contract"),
    (SELECT json_agg(Account) FROM (SELECT acct."Number",acct."Start",acct."End",acct."AmountPure", acct."AmountFpa", acct."AmountTotal" FROM "Ordering"."Account" as acct WHERE c."Id" = acct."ContractId" ORDER BY acct."Number") Account) AS CreatedAccounts,
    (SELECT json_agg(ContractType) FROM (SELECT * FROM "Ordering"."ContractType" as ct WHERE c."ContractTypeId" = ct."ContractTypeId") ContractType) AS ContractType,
    (SELECT json_agg(Direction) FROM (SELECT * FROM "Ordering"."Direction" as dir WHERE c."DirectionId" = dir."DirectionId") Direction) AS Direction,
    (SELECT json_agg(Department) FROM (SELECT * FROM "Ordering"."Department" as dep WHERE c."DepartmentId" = dep."DepartmentId") Department) AS Department,
    (SELECT json_agg(ContractUsers) FROM (SELECT * FROM "Ordering"."ContractUsers" as cus WHERE c."Id" = cus."ContractId") ContractUsers) AS ContractUsers
FROM "Ordering"."Contract" as c
WHERE (c."OwnerId"=4
       OR c."AllUsers"=true
       OR c."OwnerId" IN (SELECT cus."UserId" FROM "Ordering"."ContractUsers" as cus WHERE cus."ContractId"=c."Id")
       )
ORDER BY c."DateCreated" DESC
OFFSET 0 LIMIT 10