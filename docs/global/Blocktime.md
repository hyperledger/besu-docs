
### Block time

When the protocol receives a new chain head, the block time (`blockperiodseconds`) and round
timeout (`requesttimeoutseconds`) timers start. When `blockperiodseconds` expires, the protocol
proposes a new block.

If `requesttimeoutseconds` expires before adding the proposed block, a round change occurs, with
the block time and timeout timers reset. The timeout period for the new round is two times
`requesttimeoutseconds`. The timeout period continues to double each time a round fails to add a
block.

Usually, the protocol adds the proposed block before reaching `requesttimeoutseconds`. A new round
then starts, resetting the block time and round timeout timers. When `blockperiodseconds`
expires, the protocol proposes the next new block.

!!! warning

    If more than 1/3 of validators stop participating, new blocks can no longer be created and 
    `requesttimeoutseconds` doubles with each round change. The quickest method
    to resume block production is to restart all validators, which resets `requesttimeoutseconds` to
    its genesis value.

Once `blockperiodseconds` is over, the time from proposing a block to adding the block is
small (usually around one second) even in networks with geographically dispersed validators.

!!! example
    An internal network run by ConsenSys had four geographically dispersed validators in Sweden,
    Sydney, and two in North Virginia. With a `blockperiodseconds` of 5 and a `requesttimeoutseconds`
    of 10, the testnet consistently created blocks with a five second block time.

#### Tuning block timeout

To tune the block timeout for your network deployment:

1. Set `blockperiodseconds` to your desired block time and `requesttimeoutseconds` to two times
   `blockperiodseconds`.
1. Reduce `requesttimeoutseconds` until you start to see round changes occurring.
1. Increase `requesttimeoutseconds` to the value where round changes are no longer occurring.

!!! tip

    View [`TRACE` logs](../../../Reference/API-Methods.md#admin_changeloglevel) to see round change
    log messages.
