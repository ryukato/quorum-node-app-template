pragma solidity ^0.4.18;

contract TestContract {

    // key, value storage
    mapping (string=> string) map;

    /**
     * map에 key, value를 저장한다.
     *  @param    key    key
     *  @param    value  value
    */
    function save(string key, string value) public {
        map[key] = value;
    }

    /**
     *  key에 해당하는 value를 제공한다.
     *  @param    key     key
     *  @return   value   value
    */
    function getValue(string key) public view returns (string) {
        return map[key];
    }
}
