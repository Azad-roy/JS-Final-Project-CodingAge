import java.util.*;

public class AlumniDatabaseSystem {
    static class Alumni {
        String name;
        String batch;

        Alumni(String name, String batch) {
            this.name = name;
            this.batch = batch;
        }

        public String toString() {
            return "Name: " + name + ", Batch: " + batch;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<Alumni> list = new ArrayList<>();

        while (true) {
            System.out.println("\n--- Alumni Database Menu ---");
            System.out.println("1. Add Alumni");
            System.out.println("2. Update Alumni");
            System.out.println("3. Delete Alumni");
            System.out.println("4. Search by Name");
            System.out.println("5. Search by Batch");
            System.out.println("6. Display All");
            System.out.println("7. Exit");
            System.out.print("Choose: ");
            int choice = sc.nextInt();
            sc.nextLine(); // clear buffer

            switch (choice) {
                case 1:
                    System.out.print("Enter name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter batch: ");
                    String batch = sc.nextLine();
                    list.add(new Alumni(name, batch));
                    System.out.println("Added!");
                    break;

                case 2:
                    System.out.print("Enter name to update: ");
                    String oldName = sc.nextLine();
                    boolean updated = false;
                    for (Alumni a : list) {
                        if (a.name.equalsIgnoreCase(oldName)) {
                            System.out.print("New name: ");
                            a.name = sc.nextLine();
                            System.out.print("New batch: ");
                            a.batch = sc.nextLine();
                            updated = true;
                            System.out.println("Updated!");
                            break;
                        }
                    }
                    if (!updated) System.out.println("Alumni not found.");
                    break;

                case 3:
                    System.out.print("Enter name to delete: ");
                    String delName = sc.nextLine();
                    boolean deleted = false;
                    Iterator<Alumni> it = list.iterator();
                    while (it.hasNext()) {
                        if (it.next().name.equalsIgnoreCase(delName)) {
                            it.remove();
                            deleted = true;
                            System.out.println("Deleted!");
                            break;
                        }
                    }
                    if (!deleted) System.out.println("Alumni not found.");
                    break;

                case 4:
                    System.out.print("Enter name to search: ");
                    String searchName = sc.nextLine();
                    for (Alumni a : list) {
                        if (a.name.equalsIgnoreCase(searchName)) {
                            System.out.println(a);
                        }
                    }
                    break;

                case 5:
                    System.out.print("Enter batch to search: ");
                    String searchBatch = sc.nextLine();
                    for (Alumni a : list) {
                        if (a.batch.equalsIgnoreCase(searchBatch)) {
                            System.out.println(a);
                        }
                    }
                    break;

                case 6:
                    if (list.isEmpty()) {
                        System.out.println("No alumni records.");
                    } else {
                        for (Alumni a : list) {
                            System.out.println(a);
                        }
                    }
                    break;

                case 7:
                    System.out.println("Exiting...");
                    return;

                default:
                    System.out.println("Invalid option.");
            }
        }
    }
}
