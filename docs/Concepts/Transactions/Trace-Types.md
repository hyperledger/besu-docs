description: Tracing transactions
<!--- END of page meta data -->

# Transaction Trace Types  

When using [`trace_replayBlockTransactions`](../../Reference/API-Methods.md#trace_replayblocktransactions)
the trace options are [`trace`](#trace), [`vmTrace`](#vmtrace), and [`stateDiff`](#statediff).  

## trace  

Ordered list of calls to other contracts excluding precompiled contracts. 

```json tab="trace Example"
"trace":[ 
  { 
    "action":{ 
      "callType":"call",
      "from":"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
      "gas":"0xffadea",
      "input":"0x",
      "to":"0x0100000000000000000000000000000000000000",
      "value":"0x0"
    },
    "result":{ 
      "gasUsed":"0x1e",
      "output":"0x"
    },
    "subtraces":0,
    "traceAddress":[      
    ],
    "type":"call"
  }
]
```

| Key            | Value                                                                                |
|----------------| --------------------------------------------------------------------------------------|
| `action`       | Transaction details.    
| `callType`     | Indicates whether the transaction is `call` or `create`.                 
| `from`         | Address from which transaction was sent. 
| `gas`          | Gas provided by sender. 
| `input`        | Transaction data.  
| `to`           | Target of the transaction. 
| `value`        | Value transferred in transaction.   
| `result`       | Transaction result.  
| `gasUsed`      | Gas used by the transaction. Includes any refunds of unused gas. 
| `output`       | Return value of contract call. Contains only the actual value sent by a `RETURN` operation.  If a `RETURN` was not executed, the output is empty bytes.
| `subTraces`    | Traces of contract calls made by the transaction. 
| `traceAddress` | Tree list address of where the call occurred, address of the parents, and order of the current sub call. 
| `type`         | Indicates whether the transaction is a `CALL` or `CREATE` series operation. 

## vmTrace

Ordered list of EVM actions when processing the transaction. 

Besu only reports actual data returned from a `RETURN` opcode. Besu does not 
return the contents of the reserved output space for the call operations. As a result: 

* Besu reports null when a call operation ends because of a `STOP`, `HALT`, `REVERT`, running out of 
instructions, or any exceptional halts.
* When a `RETURN` operation returns data of a different length to the space reserved by the call, only
the data passed to the `RETURN` operation is reported. Besu does not include pre-existing memory data
or trim the returned data.

For out of gas operations, Besu reports the operation that caused the out of gas exception including
the calculated gas cost. No `ex` values are reported because the operation is not executed. 

```json tab="vmTrace Example"
"vmTrace":{
  "code":"0x7f3940be4289e4c3587d88c1856cc95352461992db0a584c281226faefe560b3016000527f14c4d2c102bdeb2354bfc3dc96a95e4512cf3a8461e0560e2272dbf884ef3905601052600851",
  "ops":[ 
    { 
    "cost":3,
    "ex":{ 
      "mem":null,
      "push":[ 
        "0x8"
      ],
      "store":null,
      "used":16756175
    },
    "pc":72,
    "sub":null
    },
    ...
  ]
}
```

| Key       | Value                                                                                |
|-----------| --------------------------------------------------------------------------------------|
| `code`    | Code executed by the EVM.  
| `ops`     | Sequence of EVM operations (opcodes) executed in the transaction.                
| `cost`    | Gas cost of the opcode. Includes memory expansion costs but not gas refunds. For precompiled contract calls, reports only the actual cost. 
| `ex`      | Executed operations. 
| `mem`     | Memory read or written by the operation. 
| `push`    | Adjusted stack items. For swap, includes all intermediate values and end result. Otherwise, is the value pushed onto stack. 
| `store`   | Account storage written by the operation.  
| `used`    | Remaining gas taking into account the all but 1/64th rule for calls. 
| `pc`      | Program counter.
| `sub`     | Sub call operations. 

## stateDiff

State changes in the requested block for each transaction represented as 
a map of accounts to an object. The balance, code, nonce, and storage changes are enumerated
from immediately before the transaction to after the transaction.  For the `key:value` pairs:  

* `+` indicates the field didn’t exist before and now has the specified value
* `-` indicates the value was deleted
* `*` has a from and a to value.

An absent value is distinct from zero when accounts or storage are created or cleared.

```json tab="stateDiff Example" 
"stateDiff":{
  "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73":{ 
    "balance":{ 
      "*":{ 
        "from":"0xffffffffffffffffffffffffffffffffc3e12a20b",
        "to":"0xffffffffffffffffffffffffffffffffc3dc5f091"
      }
    },
    "code":"=",
    "nonce":{ 
      "*":{ 
        "from":"0x14",
        "to":"0x15"
      }
    },
    "storage":{              
    }
  }
}
``` 

| Key            | Value                                                                                |
|-----------     | --------------------------------------------------------------------------------------|
| `balance`      | Change of balance event.
| `balance.from` | Balance before transaction.
| `balance.to`   | Balance after transaction. 
| `code`         | Changes to code. None in this example.   
| `nonce`        | Change of nonce.  
| `nonce.from`   | Nonce before transaction.  
| `nonce.to`     | Nonce after transaction.  
| `storage`      | Changes to storage. None in this example.   
