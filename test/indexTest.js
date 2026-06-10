const { expect } = require("chai");
const sinon = require("sinon");

describe("Basketball Stats", function () {
  describe("numPointsScored", function () {
    it("should return points scored by a player", function () {
      expect(numPointsScored("Alan Anderson")).to.equal(22);
      expect(numPointsScored("Ben Gordon")).to.equal(33);
    });
  });

  describe("shoeSize", function () {
    it("should return shoe size of a player", function () {
      expect(shoeSize("Alan Anderson")).to.equal(16);
      expect(shoeSize("Ben Gordon")).to.equal(15);
    });
  });

  describe("teamColors", function () {
    it("should return team colors", function () {
      expect(teamColors("Brooklyn Nets")).to.deep.equal(["Black", "White"]);
      expect(teamColors("Charlotte Hornets")).to.deep.equal([
        "Turquoise",
        "Purple",
      ]);
    });
  });

  describe("teamNames", function () {
    it("should return team names", function () {
      expect(teamNames()).to.deep.equal(["Brooklyn Nets", "Charlotte Hornets"]);
    });
  });

  describe("playerNumbers", function () {
    it("should return player numbers of a team", function () {
      expect(playerNumbers("Brooklyn Nets")).to.deep.equal([0, 30, 11, 1, 31]);
      expect(playerNumbers("Charlotte Hornets")).to.deep.equal([
        4, 0, 2, 8, 33,
      ]);
    });
  });

  describe("playerStats", function () {
    it("should return stats of a player", function () {
      expect(playerStats("Alan Anderson")).to.deep.equal({
        number: 0,
        shoe: 16,
        points: 22,
        rebounds: 12,
        assists: 12,
        steals: 3,
        blocks: 1,
        slamDunks: 1,
      });

      expect(playerStats("Ben Gordon")).to.deep.equal({
        number: 8,
        shoe: 15,
        points: 33,
        rebounds: 3,
        assists: 2,
        steals: 1,
        blocks: 1,
        slamDunks: 0,
      });
    });
  });

  describe("bigShoeRebounds", function () {
    it("should return number of rebounds for the player with the biggest shoe", function () {
      expect(bigShoeRebounds()).to.equal(12);
    });
  });

  describe("mostPointsScored", () => {
    it("should return the name of the player who scored the most points", () => {
      expect(mostPointsScored()).to.equal("Ben Gordon");
    });
  });

  describe("winningTeam", () => {
    it("should return the team with the most points scored", () => {
      expect(winningTeam()).to.equal("Brooklyn Nets");
    });
  });

  describe("playerWithLongestName", () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
    it("should return the player(s) with the longest name", () => {
      expect(playerWithLongestName()).to.equal(
        "Bismack Biyombo and Brendan Hayword are tied for the longest name",
      );
    });
    it("should return a single name if there is only one player with the longest name", () => {
      sandbox
        .stub(window, "getPlayersWithLongestName")
        .returns(["Brendan Hayword"]); //mocking only 1 player having logest name
      expect(playerWithLongestName()).to.equal("Brendan Hayword");
    });
  });

  describe("doesLongNameStealATon", () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should return false if the player with the longest name doesn't have the most steals", () => {
      sandbox
        .stub(window, "getPlayersWithLongestName")
        .returns(["Alan Anderson"]); //One player with the longest name has the most steals so setting the mock to use another player for false test
      expect(doesLongNameStealATon()).to.equal(false);
    });
    it("should return true if the player with the longest name has the most steals", () => {
      sandbox
        .stub(window, "getPlayersWithLongestName")
        .returns(["Brendan Hayword"]); //has the most steals but ties longest name so mocking only his name being longest
      expect(doesLongNameStealATon()).to.equal(true);
    });
    it("should return a message clarifying if there is a tie for longest name to show which player with the longest name had the most steals", () => {
      expect(doesLongNameStealATon()).to.equal(
        "Bismack Biyombo doesn't have the most steals, but Brendan Hayword does.",
      );
    });
  });
});
