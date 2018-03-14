'use strict';

const Node = require('./Node');

const js0 = require('js0');


Object.defineProperty(Node, 'PCopyable', { value:
class Node_PCopyable {

    static get Property() { return 'pCopyable'; }


    get sourceNode() {
        return this._source;
    }

    constructor(args)
    {
        js0.args(arguments, js0.Iterable);

        this.__args = args;

        this._copies = [];

        this._source = null;
        this._instanceKeys = [];

        this._listeners_OnCreate = null;
        this._listeners_OnDelete = null;
    }

    createCopy(instance_keys, deep_copy = true)
    {
        js0.args(arguments, Array, [ 'boolean', js0.Default ]);
        js0.assert(this._source === null, 'Cannot create copy of a copy.');

        // console.log('CREATE NODE', this.__main.constructor.name, instance_keys);

        let node_copy = this.__createCopy(instance_keys);
        node_copy.pCopyable._source = this.__main;
        for (let instance_key of instance_keys)
            node_copy.pCopyable._instanceKeys.push(instance_key);

        if (deep_copy && js0.implements(this.__main, Node.PChildren))
            this.__main.pChildren.createCopy(node_copy, instance_keys);

        this._copies.push(node_copy);

        if (this._listeners_OnCreate !== null)
            this._listeners_OnCreate(node_copy);

        return node_copy;
    }

    deleteCopies(instance_keys, deep_delete = true)
    {
        js0.args(arguments, Array, [ 'boolean', js0.Default ]);
        js0.assert(this._source === null, 'Cannot create copy of a copy.');

        for (let i = this._copies.length - 1; i >= 0; i--) {
            if (!this._copies[i].pCopyable.matchInstanceKeys(instance_keys, false))
                continue;

            this._copies.splice(i, 1);
        }

        if (deep_delete && js0.implements(this.__main, Node.PChildren))
            this.__main.pChildren.deleteCopies(this.__main, instance_keys);
    }

    getNodeCopies(instance_keys = null)
    {
        js0.args(arguments, [ Array, js0.Default ]);

        if (instance_keys === null)
            return this._copies.slice();

        // console.log('QQQ', this._copies.length);

        let node_copies = [];
        for (let node_copy of this._copies) {
            // console.log('WTF?');
            // console.log('Bam', instance_keys, node_copy.pCopyable._instanceKeys);
            if (node_copy.pCopyable.matchInstanceKeys(instance_keys))
                node_copies.push(node_copy);
        }

        return node_copies;
    }

    getOriginalNode()
    {
        let source_node = this.__main;
        while (source_node.pCopyable._source !== null)
            source_node = this._source;

        return source_node;
    }

    matchInstanceKeys(instance_keys, exact = true)
    {
        js0.args(arguments, Array);

        if (this._source === null)
            throw new Error(`\`matchInstanceKeys\` on node that is not a copy.`);

        if (exact) {
            if (instance_keys.length !== this._instanceKeys.length)
                return false;
        }

        for (let i = 0; i < instance_keys.length; i++) {
            if (instance_keys[i] === null)
                continue;

            if (instance_keys[i] !== this._instanceKeys[i])
                return false;
        }

        return true;
    }

    onCreate(on_create_listener)
    {
        this._listeners_OnCreate = on_create_listener;
    }

    onDelete(on_delete_listener)
    {
        this._listeners_OnDelete = on_delete_listener;
    }


    __addInstance(key, instance_node)
    {
        js0.args(arguments, [ 'string', 'number' ],
                require('./nodes/RepeatNode').InstanceNode);

        this._instanceInfos.push({
            key: key,
            instanceNode: instance_node
        });
    }

    // __setSourceNode(source_node)
    // {
    //     js0.args(arguments, Node);
    //
    //     this._source = source_node;
    // }

    __createCopy(instance_keys) { js0.virtual(this); }

}});
module.exports = Node.PCopyable;
