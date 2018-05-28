const TwoWay = {
    model: {
        prop: 'bindValue',
        event: 'valueChanged'
    },
    props: ['bindValue'],
    computed: {
        currentValue: {
            get()
            {
                return this.bindValue;
            },
            set(value)
            {
                this.$emit('valueChanged', value);
            }
        }
    },
}

export default TwoWay;