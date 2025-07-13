msg=$1 #"Bug fixes and updates."
type=$2
branch=$3

#pnpm update-module-version
#pnpm update-version

if [[ -z "${msg}" ]]
then
	msg="Bug fixes and updates."
fi

if [[ -z "${type}" ]]
then
	type="Fixed"
fi

if [[ -z "${branch}" ]]
then
	branch="dev"
fi

tsx scripts/update-changelog.ts "${msg}" "${type}"
pnpm make-changelog-markdown

./base_commit.sh -t "${type}" -m "${msg}" -b "${branch}"
