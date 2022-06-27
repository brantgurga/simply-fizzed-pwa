import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  DocumentData,
  FirestoreDataConverter,
  getDocs,
  getFirestore,
  orderBy,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const Sodas: React.FC = () => {
  interface Soda {
    brand: string;
    flavor: string;
  }
  const [sodaList, setSodaList] = useState<Soda[]>([]);
  const [newSodaBrand, setNewSodaBrand] = useState("");
  const [newSodaFlavor, setNewSodaFlavor] = useState("");
  const db = getFirestore(getApp());
  const sodaConverter: FirestoreDataConverter<Soda> = {
    toFirestore: function (modelObject: WithFieldValue<Soda>): DocumentData {
      return { brand: modelObject.brand, flavor: modelObject.flavor };
    },
    fromFirestore: function (
      snapshot: QueryDocumentSnapshot<DocumentData>,
      options?: SnapshotOptions | undefined
    ): Soda {
      const data = snapshot.data(options);
      return {
        brand: data.brand,
        flavor: data.flavor,
      };
    },
  };
  const sodas = collection(db, "sodas").withConverter(sodaConverter);
  const [reload, setReload] = useState(true);
  useEffect(() => {
    if (reload) {
      const allSodas = query(sodas, orderBy("brand"), orderBy("flavor"));
      let unmounted = false;
      const allSodasDetails = getDocs(allSodas);
      allSodasDetails.then((value) => {
        const newSodas: Soda[] = [];
        value.forEach((soda) => {
          const data = soda.data();
          newSodas.push(data);
        });
        if (!unmounted) {
          setSodaList(newSodas);
          setReload(false);
        }
      });
      return () => {
        unmounted = true;
      };
    }
  }, [reload, sodas]);
  const addSoda = () => {
    addDoc<Soda>(sodas, { brand: newSodaBrand, flavor: newSodaFlavor }).then(
      () => {
        setNewSodaBrand("");
        setNewSodaFlavor("");
      }
    );
  };
  const signedOut = getAuth(getApp()).currentUser == null;
  return (
    <List>
      {sodaList.map((soda, index) => {
        return (
          <ListItem key={index}>
            {soda.brand} {soda.flavor}
          </ListItem>
        );
      })}
      <ListItem key="newSoda">
        <TextField
          disabled={signedOut}
          required
          label="New Soda Brand"
          defaultValue={newSodaBrand}
          onBlur={(event) => {
            setNewSodaBrand(event.target.value);
          }}
        />
        <TextField
          disabled={signedOut}
          required
          label="New Soda Flavor"
          defaultValue={newSodaFlavor}
          onBlur={(event) => {
            setNewSodaFlavor(event.target.value);
          }}
        />
        <Button
          disabled={signedOut}
          onClick={(_event) => {
            addSoda();
          }}
        >
          Add Soda
        </Button>
      </ListItem>
    </List>
  );
};

export default Sodas;
