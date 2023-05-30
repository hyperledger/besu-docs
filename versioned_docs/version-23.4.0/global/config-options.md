### Optional configuration options

Optional configuration options in the genesis file are:

- `messageQueueLimit` - In large networks with limited resources, increasing the message queue limit might help with message activity surges. The default is 1000.
- `duplicateMessageLimit` - If the same node is retransmitting messages, increasing the duplicate message limit might reduce the number of retransmissions. A value of two to three times the number of validators is usually enough. The default is 100.
- `futureMessagesLimit` - The future messages buffer holds messages for a future chain height. For large networks, increasing the future messages limit might be useful. The default is 1000.
- `futureMessagesMaxDistance` - The maximum height from the current chain height for buffering messages in the future messages buffer. The default is 10.
