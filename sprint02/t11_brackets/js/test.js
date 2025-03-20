const expect = chai.expect;

describe('checkBrackets', function () {

    // Правильні випадки
    it('should return 0 for a correctly balanced string "(())"', function () {
        expect(checkBrackets("(())")).to.equal(0);
    });

    it('should return 0 for a correctly balanced string "((()))"', function () {
        expect(checkBrackets("((()))")).to.equal(0);
    });

    it('should return 0 for a correctly balanced string "()()"', function () {
        expect(checkBrackets("()()")).to.equal(0);
    });

    it('should return 0 for a correctly balanced string "(())(())"', function () {
        expect(checkBrackets("(())(())")).to.equal(0);
    });

    it('should return 0 for a correctly balanced string "(((())))"', function () {
        expect(checkBrackets("(((())))")).to.equal(0);
    });

    it('should return 1 for a string with 1 missing closing bracket "(()"', function () {
        expect(checkBrackets("(()")).to.equal(1);
    });

    it('should return 1 for a string with 1 missing opening bracket "())"', function () {
        expect(checkBrackets("())")).to.equal(1);
    });

    it('should return 3 for a string with 3 missing closing brackets "((("', function () {
        expect(checkBrackets("(((")).to.equal(3);
    });

    it('should return 3 for a string with 3 missing opening brackets "())))"', function () {
        expect(checkBrackets("())))")).to.equal(3);
    });

    it('should return 1 for a string with an extra closing bracket "a(b)c)"', function () {
        expect(checkBrackets("a(b)c)")).to.equal(1);
    });

    it('should return 1 for a string with a missing closing bracket "(a(b)c"', function () {
        expect(checkBrackets("(a(b)c")).to.equal(1);
    });

    it('should return 0 for a correctly balanced string with extra characters "x(())y"', function () {
        expect(checkBrackets("x(())y")).to.equal(0);
    });

    // Некоректні випадки
    it('should return -1 for non-string input (number)', function () {
        expect(checkBrackets(123)).to.equal(-1);
    });

    it('should return -1 for non-string input (null)', function () {
        expect(checkBrackets(null)).to.equal(-1);
    });

    it('should return -1 for non-string input (undefined)', function () {
        expect(checkBrackets(undefined)).to.equal(-1);
    });

    it('should return -1 for non-string input (array)', function () {
        expect(checkBrackets([])).to.equal(-1);
    });

    it('should return -1 for non-string input (object)', function () {
        expect(checkBrackets({})).to.equal(-1);
    });

    it('should return -1 for a string without any brackets "hello"', function () {
        expect(checkBrackets("hello")).to.equal(-1);
    });

    it('should return -1 for a string without any brackets "12345"', function () {
        expect(checkBrackets("12345")).to.equal(-1);
    });

    it('should return -1 for an empty string ""', function () {
        expect(checkBrackets("")).to.equal(-1);
    });

    it('should return 5 for a string with only opening brackets "((((("', function () {
        expect(checkBrackets("(((((")).to.equal(5);
    });

    it('should return 5 for a string with only closing brackets ")))))"', function () {
        expect(checkBrackets(")))))")).to.equal(5);
    });

});
